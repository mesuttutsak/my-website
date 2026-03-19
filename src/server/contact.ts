import "server-only";

import type { ContactMessageInput } from "@/src/features/contact/types";
import {
  ContactProviderError,
  hasEmailJsConfig,
  sendWithEmailJs,
} from "@/src/server/contact-providers/emailjs";

export { ContactProviderError, hasEmailJsConfig };

export async function sendContactMessage(input: ContactMessageInput) {
  await sendWithEmailJs(input);
}
