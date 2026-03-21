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
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    const validatedPayload = await parseContactMessageInput(payload);

    await sendContactMessage(validatedPayload);

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ContactProviderError) {
      console.error("Failed to send contact message.", error);

      return NextResponse.json(
        {
          message:
            error.code === "config"
              ? "EmailJS configuration is incomplete."
              : error.code === "restricted_environment"
                ? "Non-browser API access is disabled in your EmailJS account. Enable it from the dashboard."
                : "An error occurred while sending the message.",
        },
        { status: 500 }
      );
    }

    const validationMessage = getContactValidationMessage(error);

    if (validationMessage !== "Please fill out all fields correctly.") {
      return NextResponse.json({ message: validationMessage }, { status: 400 });
    }

    if (!hasEmailJsConfig) {
      return NextResponse.json(
        { message: "EmailJS configuration is incomplete." },
        { status: 500 }
      );
    }

    console.error("Failed to validate contact message.", error);

    return NextResponse.json({ message: validationMessage }, { status: 400 });
  }
}
