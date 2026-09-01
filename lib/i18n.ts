export type Locale = "es" | "en";

export const translations = {
  es: {
    langName: "ES",
    switchTo: "English",
    landing: {
      eyebrow: "Oferta exclusiva para huéspedes",
      headline: "Un regalo de bienvenida para tu próxima estancia",
      subtext:
        "Déjanos tu correo y recibe un cupón de descuento exclusivo, además de acceso anticipado a nuestras ofertas y experiencias en Barceló Guatemala City.",
      footer:
        "Barceló Guatemala City. Uso de datos según nuestra política de privacidad.",
    },
    form: {
      title: "Recibe tu cupón",
      subtitle: "Te lo enviamos a tu correo. Toma menos de un minuto.",
      nameLabel: "Nombre",
      optional: "(opcional)",
      namePlaceholder: "Tu nombre",
      roomLabel: "Número de habitación",
      roomPlaceholder: "Ej. 305",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tucorreo@ejemplo.com",
      consentText:
        "Autorizo a Barceló Guatemala City a enviarme ofertas y comunicaciones por correo, y acepto la",
      privacyLink: "política de privacidad",
      submit: "Quiero mi cupón",
      sending: "Enviando…",
      errInvalidEmail: "Escribe un correo electrónico válido.",
      errConsent: "Necesitamos tu autorización para poder enviarte ofertas.",
      errGeneric: "No pudimos completar el registro.",
      errConnection: "Hubo un problema de conexión. Inténtalo de nuevo.",
      successTitle: "¡Casi listo! Revisa tu correo",
      successBodyA: "Enviamos un enlace a",
      successBodyB: "Ábrelo y haz clic en",
      successBodyBtn: "“Reclamar mi cupón”",
      successBodyC: "para activarlo.",
      spamNote: "¿No lo ves? Revisa la carpeta de spam o promociones.",
      confirmedTitle: "Ya habías reclamado tu cupón",
      confirmedBodyA: "El correo",
      confirmedBodyB:
        "ya está registrado y confirmado. Busca en tu bandeja el cupón que te enviamos antes.",
    },
    confirm: {
      invalidTitle: "Enlace no válido",
      invalidIncomplete:
        "El enlace está incompleto. Revisa el correo que te enviamos e inténtalo de nuevo.",
      invalidNotFound:
        "Este enlace no existe o ya expiró. Vuelve a registrarte para recibir uno nuevo.",
      okTitle: "¡Correo confirmado!",
      okInstruction:
        "Guarda este código y preséntalo en recepción o al hacer tu reserva.",
      couponLabel: "Cupón de bienvenida",
      footerNote:
        "Te enviaremos también futuras ofertas exclusivas. Puedes darte de baja cuando quieras.",
    },
  },
  en: {
    langName: "EN",
    switchTo: "Español",
    landing: {
      eyebrow: "Exclusive offer for guests",
      headline: "A welcome gift for your next stay",
      subtext:
        "Leave us your email and receive an exclusive discount coupon, plus early access to our offers and experiences at Barceló Guatemala City.",
      footer:
        "Barceló Guatemala City. Data use according to our privacy policy.",
    },
    form: {
      title: "Get your coupon",
      subtitle: "We'll send it to your email. It takes less than a minute.",
      nameLabel: "Name",
      optional: "(optional)",
      namePlaceholder: "Your name",
      roomLabel: "Room number",
      roomPlaceholder: "e.g. 305",
      emailLabel: "Email address",
      emailPlaceholder: "youremail@example.com",
      consentText:
        "I authorize Barceló Guatemala City to send me offers and communications by email, and I accept the",
      privacyLink: "privacy policy",
      submit: "I want my coupon",
      sending: "Sending…",
      errInvalidEmail: "Please enter a valid email address.",
      errConsent: "We need your authorization to send you offers.",
      errGeneric: "We couldn't complete your registration.",
      errConnection: "There was a connection problem. Please try again.",
      successTitle: "Almost done! Check your email",
      successBodyA: "We sent a link to",
      successBodyB: "Open it and click",
      successBodyBtn: "“Claim my coupon”",
      successBodyC: "to activate it.",
      spamNote: "Don't see it? Check your spam or promotions folder.",
      confirmedTitle: "You already claimed your coupon",
      confirmedBodyA: "The email",
      confirmedBodyB:
        "is already registered and confirmed. Check your inbox for the coupon we sent earlier.",
    },
    confirm: {
      invalidTitle: "Invalid link",
      invalidIncomplete:
        "The link is incomplete. Please check the email we sent and try again.",
      invalidNotFound:
        "This link doesn't exist or has expired. Please register again to get a new one.",
      okTitle: "Email confirmed!",
      okInstruction:
        "Save this code and present it at reception or when making your booking.",
      couponLabel: "Welcome coupon",
      footerNote:
        "We'll also send you future exclusive offers. You can unsubscribe anytime.",
    },
  },
} as const;

export function getT(locale: Locale) {
  return translations[locale];
}

export type T = ReturnType<typeof getT>;
export type FormT = T["form"];
export type ConfirmT = T["confirm"];
