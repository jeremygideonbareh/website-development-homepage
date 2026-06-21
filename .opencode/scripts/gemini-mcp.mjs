import { createInterface } from "node:readline"

const API_KEY = process.env.GEMINI_API_KEY
if (!API_KEY) {
  process.stderr.write('Missing GEMINI_API_KEY environment variable\n')
  process.exit(1)
}

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash"
let pending = 0

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n")
}

function toolResponse(id, content) {
  send({
    jsonrpc: "2.0",
    id,
    result: {
      content: [{ type: "text", text: content }]
    }
  })
}

function error(id, code, message) {
  send({
    jsonrpc: "2.0",
    id,
    error: { code, message }
  })
}

async function askGemini(prompt, systemInstruction) {
  const body = { contents: [{ parts: [{ text: prompt }] }] }
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] }
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error (${res.status}): ${err}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
}

const handlers = {
  initialize: (id) => {
    send({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "gemini-mcp", version: "1.0.0" }
      }
    })
  },

  "tools/list": (id) => {
    send({
      jsonrpc: "2.0",
      id,
      result: {
        tools: [
          {
            name: "ask_gemini",
            description: "Ask Google Gemini for creative ideas, brainstorming, analysis, or any question.",
            inputSchema: {
              type: "object",
              properties: {
                prompt: { type: "string", description: "The question or creative brief" },
                systemInstruction: { type: "string", description: "Optional system instruction to set perspective" }
              },
              required: ["prompt"]
            }
          },
          {
            name: "brainstorm",
            description: "Guided brainstorming with Gemini. Get multiple creative angles on a topic.",
            inputSchema: {
              type: "object",
              properties: {
                topic: { type: "string", description: "The topic to brainstorm" },
                angle: { type: "string", description: "Optional creative angle/constraint" },
                count: { type: "number", description: "Number of ideas (default: 5)" }
              },
              required: ["topic"]
            }
          }
        ]
      }
    })
  },

  "tools/call": async (id, params) => {
    const { name, arguments: args } = params
    pending++
    try {
      switch (name) {
        case "ask_gemini":
          toolResponse(id, await askGemini(args.prompt, args.systemInstruction))
          break
        case "brainstorm": {
          const prompt = `Brainstorm ${args.count || 5} creative ideas around: "${args.topic}"${args.angle ? ` with a ${args.angle} angle` : ""}. Give each a short title and 1-2 sentence description. Be original and unexpected.`
          toolResponse(id, await askGemini(prompt, "You are a world-class creative director. Avoid cliches."))
          break
        }
        default:
          error(id, -32601, `Unknown tool: ${name}`)
      }
    } catch (e) {
      error(id, -32603, e.message)
    } finally {
      pending--
      checkDone()
    }
  },

  "notifications/initialized": () => {}
}

function handleMessage(line) {
  const trimmed = line.trim()
  if (!trimmed) return

  let msg
  try {
    msg = JSON.parse(trimmed)
  } catch {
    return
  }

  const { id, method, params } = msg
  const handler = handlers[method]
  if (handler) {
    handler(id, params)
  } else if (id) {
    error(id, -32601, `Unknown method: ${method}`)
  }
}

function checkDone() {
  if (rl.closed && pending === 0) {
    process.exit(0)
  }
}

const rl = createInterface({ input: process.stdin })
rl.on("line", handleMessage)
rl.on("close", () => {
  checkDone()
})
