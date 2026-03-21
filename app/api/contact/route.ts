import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";

import { resolveAppLocale } from "@/src/i18n/config";
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
  const locale = resolveAppLocale(request.headers.get("x-app-locale"));
  const t = await getTranslations({ locale, namespace: "contact" });
  const tValidation = await getTranslations({
    locale,
    namespace: "contact.validation",
  });
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: t("api.invalidBody") },
      { status: 400 }
    );
  }

  try {
    const validatedPayload = await parseContactMessageInput(payload, tValidation);

    await sendContactMessage(validatedPayload);

    return NextResponse.json(
      { message: t("api.messageSent") },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ContactProviderError) {
      console.error("Failed to send contact message.", error);

      return NextResponse.json(
        {
          message:
            error.code === "config"
              ? t("api.configIncomplete")
              : error.code === "restricted_environment"
                ? t("api.restrictedEnvironment")
                : t("api.sendError"),
        },
        { status: 500 }
      );
    }

    const validationMessage = getContactValidationMessage(error, tValidation);

    if (validationMessage !== tValidation("invalid")) {
      return NextResponse.json({ message: validationMessage }, { status: 400 });
    }

    if (!hasEmailJsConfig) {
      return NextResponse.json(
        { message: t("api.configIncomplete") },
        { status: 500 }
      );
    }

    console.error("Failed to validate contact message.", error);

    return NextResponse.json({ message: validationMessage }, { status: 400 });
  }
}
