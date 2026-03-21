'use client'

import { Formik, Form, FormikHelpers } from "formik";
import { useLocale, useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";

import { submitContactMessage } from "@/src/features/contact/client";
import { getContactMessageSchema } from "@/src/features/contact/schema";
import type { ContactMessageInput } from "@/src/features/contact/types";
import { useAsyncAction } from "@/src/shared/hooks/useAsyncAction";
import Button from "@/src/ui/Button";
import FormGroup from "@/src/ui/FormGroup";
import Section from "@/src/ui/Section";
import Surface from "@/src/ui/Surface";
import Text from "@/src/ui/Text";
import styles from "./page.module.scss";

type FormValues = ContactMessageInput;

const ContactPageClient = () => {
  const locale = useLocale();
  const t = useTranslations("contact");
  const tValidation = useTranslations("contact.validation");
  const initialValues: FormValues = {
    from_name: "",
    from_email: "",
    message: "",
  };
  const validationSchema = getContactMessageSchema(tValidation);
  const { run: submitMessage, isLoading } = useAsyncAction(
    async (values: FormValues, resetForm: () => void) => {
      await submitContactMessage(values, locale, t("api.sendError"));
      resetForm();
    }
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const postMessage = submitMessage(values, resetForm).finally(() => {
      setSubmitting(false);
    });

    toast.promise(
      postMessage,
      {
        loading: t("toasts.loading"),
        success: t("toasts.success"),
        error: (error) =>
          error instanceof Error ? error.message : t("toasts.sendError"),
      },
      {
        duration: 1000,
        position: "top-right",
      }
    );

    await postMessage.catch(() => undefined);
  };

  return (
    <Surface>
      <Section customClassname={[styles.contactPage]} id="contactPage" variant="flat">
        <div className="mb-5">
          <Link href={"/"}>
            <BiChevronLeftCircle size={24} />
          </Link>

          <Text tag="h1" customClassname={["mt-4"]}>
            {t("title")}
          </Text>

          <Text>{t("description")}</Text>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className={styles.form}>
              <div className={styles.formRow}>
                <FormGroup
                  fieldObject={{
                    type: "text",
                    placeholder: t("form.namePlaceholder"),
                  }}
                  name="from_name"
                />

                <FormGroup
                  fieldObject={{
                    type: "text",
                    placeholder: t("form.emailPlaceholder"),
                  }}
                  name="from_email"
                />
              </div>

              <FormGroup
                fieldObject={{
                  type: "textarea",
                  placeholder: t("form.messagePlaceholder"),
                }}
                name="message"
              />

              <Button
                type="submit"
                size="large"
                className={["w-full"]}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                {t("form.send")}
              </Button>
            </Form>
          )}
        </Formik>
        <Toaster />
      </Section>
    </Surface>
  );
};

export default ContactPageClient;
