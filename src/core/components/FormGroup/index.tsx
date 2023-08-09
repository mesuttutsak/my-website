import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Label, { LabelProps } from "../Label";

interface FormGroupProps {
  labelObject?: LabelProps;
  fieldObject: {
    type?: string;
    placeholder?: string;
  };
  name: string;
}

const FormGroup = ({ labelObject, fieldObject : {type = "text", placeholder = ''}, name }: FormGroupProps) => {
  return (
    <div className="formGroup">
      {labelObject && <Label htmlFor={labelObject.htmlFor}>{labelObject.children}</Label>}

      {
      type == "textarea" ? 
      <Field as={type ? type : 'text' } id={labelObject?.htmlFor} placeholder={placeholder} name={name} /> :
      <Field type={type} id={labelObject?.htmlFor} placeholder={placeholder} name={name} />
      }

      <ErrorMessage className="inputError" name={name} component="div" />

    </div>
  );
};

export default FormGroup;
