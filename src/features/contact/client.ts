import type {
  ContactApiResponse,
  ContactMessageInput,
} from "@/src/features/contact/types";

export async function submitContactMessage(input: ContactMessageInput) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const payload = (await response.json().catch(() => null)) as
    | ContactApiResponse
    | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Mesaj gonderilemedi.");
  }

  return payload;
}
