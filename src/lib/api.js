const PROXY_URL = '/api/leads'

export async function uploadLeadFiles(leadId, files) {
  const fd = new FormData()
  fd.append('leadId', leadId)
  for (const file of files) {
    fd.append('files', file)
  }

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: fd,
  })

  const result = await res.json()
  if (!res.ok) throw new Error(result.error || 'Upload failed')
  return result
}

export async function submitLead(data) {
  let body
  let headers = {}

  if (data.files && data.files.length > 0) {
    const fd = new FormData()
    for (const [key, value] of Object.entries(data)) {
      if (key === 'files') {
        for (const file of value) {
          fd.append('files', file)
        }
      } else {
        fd.append(key, value)
      }
    }
    body = fd
  } else {
    headers['Content-Type'] = 'application/json'
    const { files, ...rest } = data
    body = JSON.stringify(rest)
  }

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers,
    body,
  })

  const result = await res.json()

  if (!res.ok) {
    const error = new Error(result.message || 'Something went wrong.')
    error.status = res.status
    error.details = result.details || null
    error.statusCode = result.status
    throw error
  }

  return result
}
