import type { AppLocale } from "@/src/i18n/config";
import type {
  ContactApiResponse,
  ContactMessageInput,
} from "@/src/features/contact/types";

export async function submitContactMessage(
  input: ContactMessageInput,
  locale: AppLocale,
  fallbackErrorMessage: string
) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-App-Locale": locale,
    },
    body: JSON.stringify(input),
  });

  const payload = (await response.json().catch(() => null)) as
    | ContactApiResponse
    | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? fallbackErrorMessage);
  }

  return payload;
}
