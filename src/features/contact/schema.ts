import * as Yup from "yup";

import type { ContactMessageInput } from "@/src/features/contact/types";

export const contactMessageSchema = Yup.object({
  from_name: Yup.string().trim().max(100).required("Name is required."),
  from_email: Yup.string()
    .trim()
    .max(320)
    .email("Please enter a valid email address.")
    .required("Email is required."),
  message: Yup.string()
    .trim()
    .max(2000)
    .required("Message is required."),
});

export async function parseContactMessageInput(payload: unknown) {
  return contactMessageSchema.validate(payload, {
    abortEarly: true,
    stripUnknown: true,
  }) as Promise<ContactMessageInput>;
}

export function getContactValidationMessage(error: unknown) {
  if (error instanceof Yup.ValidationError) {
    return error.message || "Please fill out all fields correctly.";
  }

  return "Please fill out all fields correctly.";
}
