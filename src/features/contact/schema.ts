import * as Yup from "yup";

import type { ContactMessageInput } from "@/src/features/contact/types";

const contactValidationKeys = [
  "emailInvalid",
  "emailRequired",
  "invalid",
  "messageRequired",
  "nameRequired",
] as const;

type ContactValidationKey = (typeof contactValidationKeys)[number];

type ContactValidationTranslator = (key: ContactValidationKey) => string;

export function getContactMessageSchema(t: ContactValidationTranslator) {

  return Yup.object({
    from_name: Yup.string()
      .trim()
      .max(100)
      .required(t("nameRequired")),
    from_email: Yup.string()
      .trim()
      .max(320)
      .email(t("emailInvalid"))
      .required(t("emailRequired")),
    message: Yup.string()
      .trim()
      .max(2000)
      .required(t("messageRequired")),
  });
}

export async function parseContactMessageInput(
  payload: unknown,
  t: ContactValidationTranslator
) {
  return getContactMessageSchema(t).validate(payload, {
    abortEarly: true,
    stripUnknown: true,
  }) as Promise<ContactMessageInput>;
}

export function getContactValidationMessage(
  error: unknown,
  t: ContactValidationTranslator
) {
  const fallbackMessage = t("invalid");

  if (error instanceof Yup.ValidationError) {
    return error.message || fallbackMessage;
  }

  return fallbackMessage;
}
