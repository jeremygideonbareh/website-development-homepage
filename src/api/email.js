const RESEND_API_BASE = 'https://api.resend.com/emails'

function safe(val) {
  if (val == null) return ''
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildLeadNotificationHtml(lead) {
  const rows = [
    ['Name', safe(lead.name)],
    ['Email', `<a href="mailto:${safe(lead.email)}" style="color:#FF6B4A;">${safe(lead.email)}</a>`],
  ]
  if (lead.company) rows.push(['Company', safe(lead.company)])
  if (lead.phone) rows.push(['Phone', safe(lead.phone)])
  if (lead.project_tier) rows.push(['Project Tier', safe(lead.project_tier)])
  if (lead.message) rows.push(['Message', safe(lead.message)])

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;color:#8A8A8A;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06);">${safe(label)}</td><td style="padding:8px 0;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06);">${value}</td></tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#1A1817;color:#F2F2F2;padding:40px 24px;margin:0;">
  <table style="width:100%;max-width:560px;margin:0 auto;">
    <tr>
      <td style="padding-bottom:24px;">
        <h1 style="font-size:22px;font-weight:600;color:#FF6B4A;margin:0;">New Lead &mdash; Rogue Code</h1>
      </td>
    </tr>
    <tr>
      <td style="background:rgba(255,255,255,0.03);border-radius:12px;padding:20px 24px;">
        <table style="width:100%;border-collapse:collapse;">
          ${tableRows}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding-top:24px;">
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:0 0 16px;" />
        <p style="color:#6A6A6A;font-size:12px;margin:0;">Sent from rogue.codes lead form &middot; ${safe(lead.timestamp ? new Date(lead.timestamp).toLocaleString() : new Date().toISOString())}</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildAutoReplyHtml(name) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#1A1817;color:#F2F2F2;padding:40px 24px;margin:0;">
  <table style="width:100%;max-width:560px;margin:0 auto;">
    <tr>
      <td style="padding-bottom:24px;">
        <h1 style="font-size:22px;font-weight:600;color:#FF6B4A;margin:0;">Thank you, ${safe(name)}!</h1>
      </td>
    </tr>
    <tr>
      <td style="background:rgba(255,255,255,0.03);border-radius:12px;padding:24px;">
        <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">We&rsquo;ve received your message and our team will review it shortly.</p>
        <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">If your project is a good fit, we&rsquo;ll reach out within 1&ndash;2 business days to schedule a discovery call.</p>
        <p style="font-size:14px;line-height:1.6;margin:0;">
          In the meantime, feel free to explore our work at<br />
          <a href="https://rogue.codes" style="color:#FF6B4A;text-decoration:underline;">rogue.codes</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding-top:24px;">
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:0 0 16px;" />
        <p style="color:#6A6A6A;font-size:12px;margin:0;">&mdash; Rogue Code Team</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Sends a lead notification email to the team.
 * Gracefully skips if RESEND_API_KEY is not configured.
 */
export async function sendLeadEmail(lead, env) {
  const RESEND_API_KEY = env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set — skipping email notification')
    return { sent: false, reason: 'RESEND_API_KEY not configured' }
  }

  const subjectParts = [`New Lead: ${safe(lead.name)}`]
  if (lead.project_tier) subjectParts.push(safe(lead.project_tier))
  const subject = subjectParts.join(' — ')

  const html = buildLeadNotificationHtml(lead)
  const text = `New Lead from Rogue Code\n\nName: ${lead.name}\nEmail: ${lead.email}${lead.company ? `\nCompany: ${lead.company}` : ''}${lead.project_tier ? `\nTier: ${lead.project_tier}` : ''}${lead.phone ? `\nPhone: ${lead.phone}` : ''}${lead.message ? `\n\nMessage:\n${lead.message}` : ''}`

  try {
    const res = await fetch(RESEND_API_BASE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Rogue Code <leads@rogue.codes>',
        to: 'cloudlyconfusing@gmail.com',
        subject,
        html,
        text,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Resend API error')
    console.log('Lead email sent:', data.id)
    return { sent: true, id: data.id }
  } catch (err) {
    console.error('Failed to send lead email:', err)
    return { sent: false, reason: err.message }
  }
}

/**
 * Sends an automated confirmation email back to the lead.
 * Gracefully skips if RESEND_API_KEY is not configured.
 */
export async function sendAutoReply({ email, name }, env) {
  const RESEND_API_KEY = env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set — skipping auto-reply')
    return { sent: false, reason: 'RESEND_API_KEY not configured' }
  }

  const html = buildAutoReplyHtml(name)
  const text = `Thank you, ${name}!\n\nWe've received your message and will be in touch shortly.\n\n— Rogue Code Team`

  try {
    const res = await fetch(RESEND_API_BASE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Rogue Code <noreply@rogue.codes>',
        to: [email],
        subject: `Thank you for reaching out, ${name}`,
        html,
        text,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Resend API error')
    console.log('Auto-reply sent to:', email, 'id:', data.id)
    return { sent: true, id: data.id }
  } catch (err) {
    console.error('Failed to send auto-reply:', err)
    return { sent: false, reason: err.message }
  }
}
