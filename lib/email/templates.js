export function brandTemplate({ title = "SplitSetGO", bodyHtml = "" }) {
  return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background:#f6f9fc; color:#0b0b0b; margin:0; }
        .container { max-width: 640px; margin: 0 auto; padding: 24px; }
        .card { background:#ffffff; border-radius: 16px; box-shadow: 0 6px 24px rgba(0,0,0,0.06); overflow:hidden; }
        .header { padding: 20px 24px; background: linear-gradient(90deg,#22C55E,#16a34a); color:#ffffff; }
        .content { padding: 24px; }
        .footer { padding: 16px 24px; color:#6b7280; font-size: 12px; }
        a.btn { background:#22C55E; color:#ffffff; padding:10px 14px; border-radius:10px; text-decoration:none; display:inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header"><strong>SplitSetGO</strong></div>
          <div class="content">
            <h2 style="margin:0 0 12px 0;">${title}</h2>
            ${bodyHtml}
          </div>
          <div class="footer">You're receiving this because you have a SplitSetGO account.</div>
        </div>
      </div>
    </body>
  </html>`;
}


