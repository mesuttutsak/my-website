import { NextResponse } from "next/server";

import {
  getContactValidationMessage,
  parseContactMessageInput,
} from "@/src/features/contact/schema";
import {
  ContactProviderError,
  hasEmailJsConfig,
  sendContactMessage,
} from "@/src/server/contact";

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

  try {
    const validatedPayload = await parseContactMessageInput(payload);

    await sendContactMessage(validatedPayload);

    return NextResponse.json(
      { message: "Mesajin basariyla gonderildi." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ContactProviderError) {
      console.error("Failed to send contact message.", error);

      return NextResponse.json(
        {
          message:
            error.code === "config"
              ? "EmailJS ayarlari tamamlanmamis."
              : error.code === "restricted_environment"
                ? "EmailJS hesabinda non-browser API access kapali. Dashboard uzerinden etkinlestirmen gerekiyor."
                : "Mesaj gonderilirken bir hata olustu.",
        },
        { status: 500 }
      );
    }

    const validationMessage = getContactValidationMessage(error);

    if (validationMessage !== "Lutfen tum alanlari gecerli sekilde doldurun.") {
      return NextResponse.json({ message: validationMessage }, { status: 400 });
    }

    if (!hasEmailJsConfig) {
      return NextResponse.json(
        { message: "EmailJS ayarlari tamamlanmamis." },
        { status: 500 }
      );
    }

    console.error("Failed to validate contact message.", error);

    return NextResponse.json({ message: validationMessage }, { status: 400 });
  }
}
