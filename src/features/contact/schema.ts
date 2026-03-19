import * as Yup from "yup";

import type { ContactMessageInput } from "@/src/features/contact/types";

export const contactMessageSchema = Yup.object({
  from_name: Yup.string().trim().max(100).required("Ad alanı zorunludur"),
  from_email: Yup.string()
    .trim()
    .max(320)
    .email("Geçerli bir e-posta giriniz")
    .required("E-posta alanı zorunludur"),
  message: Yup.string()
    .trim()
    .max(2000)
    .required("Mesaj alanı zorunludur"),
});

export async function parseContactMessageInput(payload: unknown) {
  return contactMessageSchema.validate(payload, {
    abortEarly: true,
    stripUnknown: true,
  }) as Promise<ContactMessageInput>;
}

export function getContactValidationMessage(error: unknown) {
  if (error instanceof Yup.ValidationError) {
    return error.message || "Lutfen tum alanlari gecerli sekilde doldurun.";
  }

  return "Lutfen tum alanlari gecerli sekilde doldurun.";
}
