import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import {
  defaultAppLocale,
  localeCookieName,
  resolveAppLocale,
} from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const cookieLocale = cookies().get(localeCookieName)?.value;
  const matchedRequestLocale = await requestLocale;
  const resolvedLocale = resolveAppLocale(
    locale ?? cookieLocale ?? matchedRequestLocale ?? defaultAppLocale
  );

  return {
    locale: resolvedLocale,
    messages: getMessages(resolvedLocale),
  };
});
