/**
 * Handles file uploads to R2 (FILES bucket).
 * Gracefully returns 501 if the R2 binding is not configured.
 */
export async function handleUpload(request, env) {
  if (!env.FILES) {
    return new Response(JSON.stringify({ error: 'R2 not configured', uploads: [] }), {
      status: 501,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  const formData = await request.formData()
  const files = formData.getAll('files')
  const leadId = formData.get('leadId')

  if (!files || files.length === 0) {
    return new Response(JSON.stringify({ error: 'No files provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  const uploads = []
  for (const file of files) {
    if (!(file instanceof File)) continue
    const key = `leads/${leadId || 'unknown'}/${Date.now()}-${file.name}`
    await env.FILES.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    })
    uploads.push({ name: file.name, key, size: file.size })
  }

  return new Response(JSON.stringify({ success: true, uploads }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}
