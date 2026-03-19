import { NextResponse } from "next/server";

import type { ContactMessageInput } from "@/src/features/portfolio/types";
import { hasFirebaseAdminConfig } from "@/src/lib/firebase-admin";
import { createContactMessage } from "@/src/server/contact";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactPayload(payload: unknown): ContactMessageInput | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const { from_name, from_email, message } = payload as Record<string, unknown>;

  if (
    typeof from_name !== "string" ||
    typeof from_email !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  const normalizedPayload = {
    from_name: from_name.trim(),
    from_email: from_email.trim(),
    message: message.trim(),
  };

  if (
    !normalizedPayload.from_name ||
    !normalizedPayload.from_email ||
    !normalizedPayload.message
  ) {
    return null;
  }

  if (
    normalizedPayload.from_name.length > 100 ||
    normalizedPayload.from_email.length > 320 ||
    normalizedPayload.message.length > 2000
  ) {
    return null;
  }

  if (!emailPattern.test(normalizedPayload.from_email)) {
    return null;
  }

  return normalizedPayload;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Gecersiz istek govdesi gonderildi." },
      { status: 400 }
    );
  }

  const validatedPayload = validateContactPayload(payload);

  if (!validatedPayload) {
    return NextResponse.json(
      { message: "Lutfen tum alanlari gecerli sekilde doldurun." },
      { status: 400 }
    );
  }

  try {
    await createContactMessage(validatedPayload);

    return NextResponse.json(
      { message: "Mesajin basariyla kaydedildi." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to store contact message.", error);

    return NextResponse.json(
      {
        message: hasFirebaseAdminConfig
          ? "Mesaj kaydedilirken bir hata olustu."
          : "Firebase ayarlari tamamlanmamis.",
      },
      { status: 500 }
    );
  }
}
