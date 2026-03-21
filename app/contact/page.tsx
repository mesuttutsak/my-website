'use client'

import { Formik, Form, FormikHelpers } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";

import { submitContactMessage } from "@/src/features/contact/client";
import { contactMessageSchema } from "@/src/features/contact/schema";
import type { ContactMessageInput } from "@/src/features/contact/types";
import { useAsyncAction } from "@/src/shared/hooks/useAsyncAction";
import Button from "@/src/ui/Button";
import FormGroup from "@/src/ui/FormGroup";
import Section from "@/src/ui/Section";
import Surface from "@/src/ui/Surface";
import Text from "@/src/ui/Text";
import styles from "./page.module.scss";

type FormValues = ContactMessageInput;

const Contact = () => {
  const initialValues: FormValues = {
    from_name: "",
    from_email: "",
    message: "",
  };

  const { run: submitMessage, isLoading } = useAsyncAction(
    async (values: FormValues, resetForm: () => void) => {
      await submitContactMessage(values);
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
        loading: "Mesaj gonderiliyor...",
        success: "Mesajin gonderildi.",
        error: (error) =>
          error instanceof Error ? error.message : "Mesaj gonderilemedi.",
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
                Let&apos;s contact
              </Text>

              <Text> if you want to know your ideas or my ideas</Text>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={contactMessageSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form className={styles.form}>
                  <div className={styles.formRow}>
                    <FormGroup
                      fieldObject={{
                        type: "text",
                        placeholder: "Name *",
                      }}
                      name="from_name"
                    />

                    <FormGroup
                      fieldObject={{
                        type: "text",
                        placeholder: "Email *",
                      }}
                      name="from_email"
                    />
                  </div>

                  <FormGroup
                    fieldObject={{
                      type: "textarea",
                      placeholder: "Message *",
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
                    Gönder
                  </Button>
                </Form>
              )}
            </Formik>
            <Toaster />
          </Section>
        </Surface>
  );
};

export default Contact;
