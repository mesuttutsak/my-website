'use client'
import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import toast, { Toaster } from "react-hot-toast";

import emailjs from "@emailjs/browser";

import Surface from "@/src/core/components/Surface";
import MainLayout from "@/src/layout/MainLayout";
import Section, { Headline } from "@/src/core/components/Section";
import Text from "@/src/core/components/Text";
import FormGroup from "@/src/core/components/FormGroup";
import Button from "@/src/core/components/Button";
import Link from "next/link";

import { BiChevronLeftCircle } from "react-icons/bi";

interface FormValues {
  from_name: string;
  from_email: string;
  message: string;
}

const Contact = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormValues = {
    from_name: "",
    from_email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    from_name: Yup.string().required("Ad alanı zorunludur"),
    from_email: Yup.string()
      .email("Geçerli bir e-posta giriniz")
      .required("E-posta alanı zorunludur"),
    message: Yup.string().required("Mesaj alanı zorunludur"),
  });

  const onSubmit = (values: FormValues, { setSubmitting, resetForm }: any) => {
    setIsLoading(true);

    let services_id: any = process?.env?.MAIL_SERVICE_ID;
    let template_id: any = process?.env?.MAIL_TEMPLATE_ID;
    let user_id = process?.env?.MAIL_USER_ID;
    let template_params: any = values;

    const postMail = emailjs
      .send(services_id, template_id, template_params, user_id)
      .then(
        (res) => {
          resetForm();
        },
        (err) => {
          console.log(err);
        }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(
      postMail,
      {
        loading: "Submitting...",
        success: "Successfully sent.",
        error: (err) => err,
      },
      {
        duration: 1000,
        position: "top-right",
      }
    );

    setSubmitting(false);
  };

  return (
        <Surface>
          <Section theme="light" id="contactPage">
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
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }: any) => (
                <Form>
                  <div className="flex flex-row flex-1 gap-3">
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
