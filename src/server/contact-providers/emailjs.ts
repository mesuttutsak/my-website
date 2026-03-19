import "server-only";

import { toContactTemplateParams } from "@/src/features/contact/template-params";
import type { ContactMessageInput } from "@/src/features/contact/types";

const emailJsApiUrl = "https://api.emailjs.com/api/v1.0/email/send";

const emailJsServiceId =
  process.env.EMAILJS_SERVICE_ID ?? process.env.MAIL_SERVICE_ID;
const emailJsTemplateId =
  process.env.EMAILJS_TEMPLATE_ID ?? process.env.MAIL_TEMPLATE_ID;
const emailJsPublicKey =
  process.env.EMAILJS_PUBLIC_KEY ?? process.env.MAIL_USER_ID;
const emailJsPrivateKey =
  process.env.EMAILJS_PRIVATE_KEY ?? process.env.MAIL_PRIVATE_KEY;

export const hasEmailJsConfig = Boolean(
  emailJsServiceId && emailJsTemplateId && emailJsPublicKey
);

type ContactProviderErrorCode =
  | "config"
  | "restricted_environment"
  | "delivery";

export class ContactProviderError extends Error {
  code: ContactProviderErrorCode;

  constructor(code: ContactProviderErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

function getMissingEmailJsEnvNames() {
  return [
    !emailJsServiceId ? "EMAILJS_SERVICE_ID or MAIL_SERVICE_ID" : null,
    !emailJsTemplateId ? "EMAILJS_TEMPLATE_ID or MAIL_TEMPLATE_ID" : null,
    !emailJsPublicKey ? "EMAILJS_PUBLIC_KEY or MAIL_USER_ID" : null,
  ].filter((value): value is string => Boolean(value));
}

function getRequiredEmailJsConfig() {
  if (hasEmailJsConfig) {
    return {
      serviceId: emailJsServiceId as string,
      templateId: emailJsTemplateId as string,
      publicKey: emailJsPublicKey as string,
      privateKey: emailJsPrivateKey,
    };
  }

  throw new ContactProviderError(
    "config",
    `EmailJS config is missing. Set ${getMissingEmailJsEnvNames().join(", ")}.`
  );
}

export async function sendWithEmailJs(input: ContactMessageInput) {
  const { serviceId, templateId, publicKey, privateKey } =
    getRequiredEmailJsConfig();

  const response = await fetch(emailJsApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      ...(privateKey ? { accessToken: privateKey } : {}),
      template_params: toContactTemplateParams(input),
    }),
    cache: "no-store",
  });

  if (response.ok) {
    return;
  }

  const errorMessage =
    (await response.text()).trim() || "EmailJS could not send the contact message.";

  if (errorMessage.includes("non-browser environments is currently disabled")) {
    throw new ContactProviderError(
      "restricted_environment",
      errorMessage
    );
  }

  throw new ContactProviderError("delivery", errorMessage);
}
