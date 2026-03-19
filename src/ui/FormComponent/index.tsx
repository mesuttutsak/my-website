import React from 'react';
import { Form } from "formik";

const FormComponent = ({children} : {children?: React.ReactNode}) => {
  return (
    <Form>{children}</Form>
  )
}

export default FormComponent