const DESTINATION_EMAIL = 'nrnavneetranjan@gmail.com';
const MAX_BODY_BYTES = 20_000;

const sendJson = (response, status, payload) => {
  response.setHeader('Cache-Control', 'no-store');
  response.status(status).json(payload);
};

function cleanText(value, preserveNewlines = false) {
  if (typeof value !== 'string') return '';
  const controlCharacters = preserveNewlines
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(/\r\n?/g, '\n').replace(controlCharacters, '').trim();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function isValidOrigin(request) {
  const origin = request.headers.origin;
  const forwardedHost = request.headers['x-forwarded-host'];
  const host = String(forwardedHost || request.headers.host || '').split(',')[0].trim().toLowerCase();
  if (!origin || !host) return true;

  try {
    return new URL(origin).host.toLowerCase() === host;
  } catch {
    return false;
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed.' });
  }

  if (!isValidOrigin(request)) {
    return sendJson(response, 403, { error: 'This request could not be verified.' });
  }

  if (!String(request.headers['content-type'] || '').includes('application/json')) {
    return sendJson(response, 415, { error: 'Send the form using JSON.' });
  }

  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return sendJson(response, 413, { error: 'Your message is too large. Please shorten it and try again.' });
  }

  let body;
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  } catch {
    return sendJson(response, 400, { error: 'The form data could not be read. Please try again.' });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return sendJson(response, 400, { error: 'Please complete all required fields.' });
  }

  // Silently accept bots that fill the hidden honeypot, but never send their message.
  if (typeof body.website === 'string' && body.website.trim()) {
    return sendJson(response, 200, { success: true });
  }

  const name = cleanText(body.name).replace(/\s+/g, ' ');
  const phone = cleanText(body.phone).replace(/\s+/g, ' ');
  const email = cleanText(body.email).toLowerCase();
  const description = cleanText(body.description, true);

  if (name.length < 2 || name.length > 120) {
    return sendJson(response, 400, { error: 'Enter your name (2 to 120 characters).' });
  }
  const digits = phone.replace(/\D/g, '');
  if (!/^\+?[0-9().\s-]{7,32}$/.test(phone) || digits.length < 7 || digits.length > 15) {
    return sendJson(response, 400, { error: 'Enter a valid phone number with 7 to 15 digits.' });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return sendJson(response, 400, { error: 'Enter a valid email address.' });
  }
  if (!description || description.length > 5000) {
    return sendJson(response, 400, { error: 'Add a project description (up to 5,000 characters).' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return sendJson(response, 503, { error: 'The contact form is not configured yet. Please email me directly.' });
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeDescription = escapeHtml(description);
  const text = [
    'New Portfolio Project Inquiry',
    '',
    `Full name: ${name}`,
    `Phone number: ${phone}`,
    `Email address: ${email}`,
    '',
    'Project description:',
    description,
  ].join('\n');
  const html = `
    <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6;max-width:680px;margin:0 auto">
      <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a91f22">Portfolio / Project Inquiry</p>
      <h1 style="font-size:24px;margin:0 0 24px">New Portfolio Project Inquiry</h1>
      <table style="width:100%;border-collapse:collapse">
        <tr><th align="left" style="padding:10px;border-bottom:1px solid #ddd">Full name</th><td style="padding:10px;border-bottom:1px solid #ddd">${safeName}</td></tr>
        <tr><th align="left" style="padding:10px;border-bottom:1px solid #ddd">Phone number</th><td style="padding:10px;border-bottom:1px solid #ddd">${safePhone}</td></tr>
        <tr><th align="left" style="padding:10px;border-bottom:1px solid #ddd">Email address</th><td style="padding:10px;border-bottom:1px solid #ddd"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      </table>
      <h2 style="font-size:16px;margin:28px 0 8px">Project description</h2>
      <div style="white-space:pre-wrap;border-left:3px solid #b51f29;padding:12px 16px;background:#f7f5f0">${safeDescription}</div>
    </div>
  `;

  try {
    const providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [DESTINATION_EMAIL],
        reply_to: email,
        subject: 'New Portfolio Project Inquiry',
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!providerResponse.ok) {
      console.error('Resend email request failed with status', providerResponse.status);
      return sendJson(response, 502, { error: 'Your message could not be sent right now. Please try again or email me directly.' });
    }

    return sendJson(response, 200, { success: true });
  } catch {
    console.error('Resend email request could not be completed.');
    return sendJson(response, 502, { error: 'Your message could not be sent right now. Please try again or email me directly.' });
  }
}
