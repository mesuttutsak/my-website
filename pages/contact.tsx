import React from "react";

import Head from "next/head";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Surface from "@/src/core/components/Surface";
import MainLayout from "@/src/layout/MainLayout";
import { Headline } from "@/src/core/components/Section";
import Text from "@/src/core/components/Text";

import FormComponent from "@/src/core/components/FormComponent";
import FormGroup from "@/src/core/components/FormGroup";

import emailjs from '@emailjs/browser';

interface FormValues {
  from_name: string;
  from_email: string;
  message: string;
}

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

const onSubmit = (values: FormValues, { setSubmitting }: any) => {

  let services_id:any = process?.env?.MAIL_SERVICE_ID;
  let template_id:any =  process?.env?.MAIL_TEMPLATE_ID;
  let user_id = process?.env?.MAIL_USER_ID;
  let template_params:any =  values;

  console.log(services_id,
    template_id,
    template_params,
    user_id);

  emailjs.send(services_id, template_id , template_params, user_id)
  .then((result) => {
      console.log('result -- ', result.text);
  }, (error) => {
      console.log('error -- ', error.text); 
  });


  setSubmitting(false);
};

const Contact = () => {
  return (
    <>
      <Head>
        <title>Mesut Tutsak - Frontend Developer</title>
        <meta
          name="description"
          content="Benim adım Mesut Tutsak, bir Frontend Developer'ım ve bu benim kişisel websitesidir."
        />
        <meta
          name="keywords"
          content="Mesut Tutsak, Frontend Developer, web developer, websitesi, frontend, HTML, CSS, JavaScript"
        />
        <meta name="author" content="Mesut Tutsak" />

        {/* <!-- Favicon --> */}
        <link
          rel="icon"
          href="https://www.mesuttutsak.dev/favicon.ico"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://www.mesuttutsak.dev/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://www.mesuttutsak.dev/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://www.mesuttutsak.dev/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="https://www.mesuttutsak.dev/site.webmanifest"
        />
      </Head>
      <MainLayout>
        <div className="contactPage">
          <Surface id="contactPage">
            <Headline>
              <Text tag="h3">Experience</Text>
            </Headline>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }: any) => (
                <FormComponent>
                  <FormGroup
                    labelObject={{
                      children: <>Name</>,
                      htmlFor: "Name",
                    }}
                    fieldObject={{
                      type: "text",
                    }}
                    name="from_name"
                  />

                  <FormGroup
                    labelObject={{
                      children: <>Email</>,
                      htmlFor: "email",
                    }}

                    fieldObject={{
                      type: "text",
                    }}

                    name="from_email"
                  />

                  <FormGroup
                    labelObject={{
                      children: <>Message</>,
                      htmlFor: "message",
                    }}

                    fieldObject={{
                      type: "textarea",
                    }}

                    name="message"
                  />

                  <button type="submit" disabled={isSubmitting}>
                    Gönder
                  </button>
                </FormComponent>
              )}
            </Formik>
            
          </Surface>
        </div>
      </MainLayout>
    </>
  );
};

export default Contact;
