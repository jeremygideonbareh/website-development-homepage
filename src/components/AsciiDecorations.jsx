import { useEffect, useRef } from 'react'

const CHAR_SETS = {
  blocks: ['█', '▓', '▒', '░', '▄', '▀', '▐', '▌', '▖', '▗', '▘', '▙', '▚', '▛', '▜', '▝', '▞', '▟'],
  tech: ['</>', '{ }', '[ ]', '( )', '/*', '*/', '==>', '<-', '=>', '::', ';;', '&&', '||'],
  lines: ['━', '┃', '┏', '┓', '┗', '┛', '┳', '┣', '┻', '┫', '╋', '╱', '╲', '◈'],
  dots: ['·', '⋅', '∙', '∘', '◦', '◌', '◍', '◎', '●', '◉', '◊', '○'],
  binary: ['0', '1', '0', '1', '0', '1'],
}

function AsciiCornerBrackets() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
      <pre className="absolute top-8 left-8 text-[10px] leading-none text-white font-mono select-none">
{`┌────────────────┐
│  SYSTEM.READY  │
└────────────────┘`}
      </pre>
      <pre className="absolute top-8 right-8 text-[10px] leading-none text-white font-mono select-none text-right">
{`┌──────────┐
│ TERMINAL │
│ v2.4.1   │
└──────────┘`}
      </pre>
      <pre className="absolute bottom-8 left-8 text-[10px] leading-none text-white font-mono select-none">
{`┌────────────────────────┐
│ CONNECTION: ESTABLISHED │
│ STATUS: OPERATIONAL     │
│ UPTIME: 99.97%          │
└────────────────────────┘`}
      </pre>
      <pre className="absolute bottom-8 right-8 text-[10px] leading-none text-white font-mono select-none text-right">
{`┌──────────────┐
│ NODE: ACTIVE │
│ PID: 0xA4F3  │
└──────────────┘`}
      </pre>
    </div>
  )
}

function AsciiGrid() {
  const gridRef = useRef(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const ob = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      const h = entry.contentRect.height
      const cols = Math.floor(w / 20)
      const rows = Math.floor(h / 20)
      el.textContent = ''
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const span = document.createElement('span')
          span.textContent = ['+', '.', '·'][Math.floor(Math.random() * 3)]
          span.className = 'inline-block w-[20px] h-[20px] text-center text-white/10 font-mono text-[8px] leading-[20px] select-none'
          el.appendChild(span)
        }
        el.appendChild(document.createElement('br'))
      }
    })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <div
      ref={gridRef}
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-30"
      style={{ lineHeight: '20px' }}
    />
  )
}

function AsciiTerminalLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
      <pre className="absolute top-1/4 left-1/4 text-[9px] leading-relaxed text-white font-mono select-none transform -translate-x-1/4 rotate-12">
{`>_ initializing kernel...
>_ loading modules...
  [############] 100%
>_ establishing secure channel...
>_ ok.`}
      </pre>
      <pre className="absolute bottom-1/3 right-1/4 text-[9px] leading-relaxed text-white font-mono select-none transform translate-x-1/4 -rotate-6">
{`λ build --production
  ✓ compiled in 2.84s
  ✓ minified
  ✓ tree-shaken
  ✓ ready`}
      </pre>
    </div>
  )
}

export default function AsciiDecorations({
  showBrackets = false,
  showGrid = false,
  showTerminal = false,
}) {
  return (
    <>
      {showBrackets && <AsciiCornerBrackets />}
      {showGrid && <AsciiGrid />}
      {showTerminal && <AsciiTerminalLines />}
    </>
  )
}
