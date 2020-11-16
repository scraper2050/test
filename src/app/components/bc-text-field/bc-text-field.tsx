import React from 'react';
import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';

type BCTextFieldProps = { placeholder: string, variant?: any, type?:any} & FieldAttributes<{}>;

export default function BCTextField({
  placeholder,
  variant,
  type,
  ...props
}: BCTextFieldProps) {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched
    ? meta.error
    : '';
  return (
    <TextField
      error={Boolean(errorText)}
      helperText={errorText}
      type={type}
      placeholder={placeholder}
      variant={variant || 'outlined'}
      {...field}
      
    />
  );
}