import { setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/src/i18n/config";
import ContactPageClient from "./ContactPageClient";

const ContactPage = ({ params }: { params: { locale: AppLocale } }) => {
  setRequestLocale(params.locale);

  return <ContactPageClient />;
};

export default ContactPage;
