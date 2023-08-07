import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Label, { LabelProps } from "../Label";

interface FormGroupProps {
  labelObject: LabelProps;
  fieldObject: {
    type?: string;
  };
  name: string;
}

const FormGroup = ({ labelObject, fieldObject : {type = "text"}, name }: FormGroupProps) => {
  return (
    <div className="formGroup">
      <Label htmlFor={labelObject.htmlFor}>{labelObject.children}</Label>

      {
      type == "textarea" ? 
      <Field as={type ? type : 'text' } id={labelObject.htmlFor} name={name} /> :
      <Field type={type} id={labelObject.htmlFor} name={name} />
      }

      <ErrorMessage className="inputError" name={name} component="div" />

    </div>
  );
};

export default FormGroup;
