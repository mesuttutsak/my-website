import React from "react";

import { FormGroupProps } from "./formGroup.types";

import { Field, ErrorMessage } from "formik";
import Label from "../Label";
import styles from "./FormGroup.module.scss";

const FormGroup = ({ labelObject, fieldObject : {type = "text", placeholder = '', autoComplete, ariaLabel}, name }: FormGroupProps) => {
  const fieldProps = {
    id: labelObject?.htmlFor,
    placeholder,
    name,
    autoComplete,
    "aria-label": labelObject ? undefined : ariaLabel,
  };


  return (
    <div className={styles.formGroup}>
      {labelObject && <Label htmlFor={labelObject.htmlFor}>{labelObject.children}</Label>}

      {
      type == "textarea" ? 
      <Field as={type ? type : 'text' } {...fieldProps} /> :
      <Field type={type} {...fieldProps} />
      }

      <ErrorMessage className={styles.inputError} name={name} component="div" />

    </div>
  );
};

export default FormGroup;
