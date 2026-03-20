import React from "react";

import { FormGroupProps } from "./formGroup.types";

import { Field, ErrorMessage } from "formik";
import Label from "../Label";
import styles from "./FormGroup.module.scss";

const FormGroup = ({ labelObject, fieldObject : {type = "text", placeholder = ''}, name }: FormGroupProps) => {
  return (
    <div className={styles.formGroup}>
      {labelObject && <Label htmlFor={labelObject.htmlFor}>{labelObject.children}</Label>}

      {
      type == "textarea" ? 
      <Field as={type ? type : 'text' } id={labelObject?.htmlFor} placeholder={placeholder} name={name} /> :
      <Field type={type} id={labelObject?.htmlFor} placeholder={placeholder} name={name} />
      }

      <ErrorMessage className={styles.inputError} name={name} component="div" />

    </div>
  );
};

export default FormGroup;
