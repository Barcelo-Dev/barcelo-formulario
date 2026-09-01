"use client";

import { useState } from "react";
import { getT, type Locale } from "@/lib/i18n";
import SubscribeForm from "./SubscribeForm";

export default function FormLanding() {
  const [lang, setLang] = useState<Locale>("es");
  const t = getT(lang);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Foto del hotel de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />
      {/* Degradado teal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(20,50,61,0.92) 0%, rgba(31,92,120,0.72) 42%, rgba(48,157,186,0.30) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Cabecera: logo + botón de idioma */}
        <header className="flex items-center justify-between px-6 pt-8 sm:px-12 sm:pt-10">
          <img
            src="/logo-white.png"
            alt="Barceló Guatemala City"
            className="h-7 w-auto sm:h-8"
          />
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
            aria-label={t.switchTo}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.25 8.25 0 005.25-14.325M12 21a8.25 8.25 0 01-5.25-14.325M3 12h18"
              />
            </svg>
            {t.switchTo}
          </button>
        </header>

        {/* Bloque central */}
        <div className="flex flex-1 items-center px-6 py-10 sm:px-12">
          <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="max-w-xl text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-barcelo-gold">
                {t.landing.eyebrow}
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
                {t.landing.headline}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/85">
                {t.landing.subtext}
              </p>
            </div>

            <div className="w-full">
              <SubscribeForm lang={lang} t={t.form} />
            </div>
          </div>
        </div>

        <footer className="px-6 pb-6 text-xs text-white/60 sm:px-12">
          © {new Date().getFullYear()} {t.landing.footer}
        </footer>
      </div>
    </main>
  );
}
