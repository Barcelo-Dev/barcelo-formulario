import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendCouponEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email("Correo inválido").max(255),
  fullName: z.string().max(120).optional().nullable(),
  roomNumber: z.string().max(20).optional().nullable(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Se requiere autorización." }),
  }),
  lang: z.enum(["es", "en"]).default("es"),
});

function siteUrl(request: Request) {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.errors[0]?.message ?? "Datos inválidos.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { email, fullName, roomNumber, consent, lang } = parsed.data;
  const cleanEmail = email.toLowerCase().trim();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("subscribers")
    .insert({
      email: cleanEmail,
      full_name: fullName?.trim() || null,
      room_number: roomNumber?.trim() || null,
      consent,
      consent_at: new Date().toISOString(),
      source: "web_form",
    })
    .select("confirm_token, confirmed")
    .single();

  let confirmToken: string | null = null;
  let alreadyConfirmed = false;

  if (error && error.code === "23505") {
    const { data: existing } = await supabase
      .from("subscribers")
      .select("confirm_token, confirmed")
      .eq("email", cleanEmail)
      .single();

    if (existing?.confirmed) {
      alreadyConfirmed = true;
    } else {
      confirmToken = existing?.confirm_token ?? null;
    }
  } else if (error) {
    console.error("Error al guardar suscriptor:", error);
    return NextResponse.json(
      { error: "No pudimos completar el registro. Inténtalo más tarde." },
      { status: 500 }
    );
  } else {
    confirmToken = data.confirm_token;
  }

  if (alreadyConfirmed) {
    return NextResponse.json({ alreadyConfirmed: true, email: cleanEmail });
  }

  if (confirmToken) {
    const claimUrl = `${siteUrl(request)}/confirmar?token=${confirmToken}&lang=${lang}`;
    try {
      await sendCouponEmail({
        to: cleanEmail,
        name: fullName?.trim() || null,
        claimUrl,
        lang,
      });
    } catch (e) {
      console.error("Error al enviar el correo:", e);
      return NextResponse.json(
        {
          error:
            "Guardamos tu registro, pero no pudimos enviar el correo. Inténtalo más tarde.",
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ emailSent: true, email: cleanEmail });
}
