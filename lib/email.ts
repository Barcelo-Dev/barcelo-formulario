import { Resend } from "resend";
import type { Locale } from "./i18n";

const emailCopy = {
  es: {
    subject: "🎁 Reclama tu cupón de Barceló Guatemala City",
    preheader: "Tu cupón de bienvenida te está esperando.",
    eyebrow: "Cupón de bienvenida",
    heading: "Tu cupón te está esperando",
    greeting: (name?: string | null) => (name ? `Hola ${name},` : "Hola,"),
    body: "Gracias por registrarte. Solo falta un paso: confirma que este correo es tuyo y activa tu cupón de descuento para tu próxima estancia en Barceló Guatemala City.",
    button: "Reclamar mi cupón",
    fallback: "Si el botón no funciona, copia y pega este enlace en tu navegador:",
    footer1: "Barceló Guatemala City · Ciudad de Guatemala",
    footer2:
      "Recibiste este correo porque te registraste en nuestra promoción. Si no fuiste tú, puedes ignorar este mensaje.",
  },
  en: {
    subject: "🎁 Claim your Barceló Guatemala City coupon",
    preheader: "Your welcome coupon is waiting for you.",
    eyebrow: "Welcome coupon",
    heading: "Your coupon is waiting",
    greeting: (name?: string | null) => (name ? `Hi ${name},` : "Hi,"),
    body: "Thanks for signing up. Just one step left: confirm this is your email and activate your discount coupon for your next stay at Barceló Guatemala City.",
    button: "Claim my coupon",
    fallback: "If the button doesn't work, copy and paste this link into your browser:",
    footer1: "Barceló Guatemala City · Guatemala City",
    footer2:
      "You received this email because you signed up for our promotion. If this wasn't you, you can ignore this message.",
  },
} as const;

export function couponEmailHtml({
  name,
  claimUrl,
  lang = "es",
}: {
  name?: string | null;
  claimUrl: string;
  lang?: Locale;
}) {
  const c = emailCopy[lang];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<title>${c.heading}</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f4ef;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${c.preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f4ef;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(20,50,61,0.08);">

          <tr>
            <td style="background-color:#2f5c78;background:linear-gradient(120deg,#2f5c78 0%,#1f7d9c 60%,#309dba 100%);padding:36px 40px;text-align:center;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#ffffff;letter-spacing:0.3px;">
                <strong>Barceló</strong> <span style="opacity:0.9;">Guatemala City</span>
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 40px 8px 40px;font-family:Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c99a3f;font-weight:bold;">
                ${c.eyebrow}
              </p>
              <h1 style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:#14323d;">
                ${c.heading}
              </h1>
              <p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;color:#33474f;">
                ${c.greeting(name)}
              </p>
              <p style="margin:0 0 28px 0;font-size:16px;line-height:1.6;color:#33474f;">
                ${c.body}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 36px 40px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#1f7d9c" style="border-radius:10px;">
                    <a href="${claimUrl}" target="_blank"
                       style="display:inline-block;padding:16px 40px;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:10px;">
                      ${c.button}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 36px 40px;font-family:Helvetica,Arial,sans-serif;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#8e9091;text-align:center;">
                ${c.fallback}<br />
                <a href="${claimUrl}" style="color:#1f7d9c;word-break:break-all;">${claimUrl}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f6f4ef;padding:24px 40px;font-family:Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 4px 0;font-size:12px;line-height:1.6;color:#8e9091;text-align:center;">
                ${c.footer1}
              </p>
              <p style="margin:0;font-size:12px;line-height:1.6;color:#8e9091;text-align:center;">
                ${c.footer2}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendCouponEmail({
  to,
  name,
  claimUrl,
  lang = "es",
}: {
  to: string;
  name?: string | null;
  claimUrl: string;
  lang?: Locale;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Faltan RESEND_API_KEY o EMAIL_FROM en el entorno.");
  }

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from,
    to,
    subject: emailCopy[lang].subject,
    html: couponEmailHtml({ name, claimUrl, lang }),
  });
}
