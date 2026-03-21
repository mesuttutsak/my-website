import "server-only";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return await getLocale();
}
