import type { ContactMessageInput } from "@/src/features/contact/types";

export function toContactTemplateParams(input: ContactMessageInput) {
  return {
    ...input,
    name: input.from_name,
    email: input.from_email,
    reply_to: input.from_email,
  };
}
