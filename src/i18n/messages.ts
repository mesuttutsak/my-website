import enMessages from "@/messages/en.json";
import trMessages from "@/messages/tr.json";
import { defaultAppLocale, type AppLocale } from "@/src/i18n/config";

export type AppMessages = typeof enMessages;

export const messages = {
  en: enMessages,
  tr: trMessages,
} satisfies Record<AppLocale, AppMessages>;

export function getMessages(locale: AppLocale = defaultAppLocale) {
  return messages[locale];
}
