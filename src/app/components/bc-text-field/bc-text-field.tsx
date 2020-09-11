import React from 'react';
import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';

type BCTextFieldProps = { placeholder: string, variant?: any } & FieldAttributes<{}>;

export default function BCTextField({
  placeholder,
  variant,
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
      placeholder={placeholder}
      variant={variant || 'outlined'}
      {...field}
    />
  );
}
