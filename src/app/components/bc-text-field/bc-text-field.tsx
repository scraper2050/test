import React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import styles from './bc-text-field.styles';

type BCTextFieldProps = { classes: any, disabled?: boolean, placeholder: string, variant?: any, type?: any, onChange?: any, required?: boolean } & FieldAttributes<{}>;

function BCTextField({
  placeholder,
  variant,
  type,
  onChange,
  disabled,
  classes,
  required = false,
  ...props
}: BCTextFieldProps) {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched
    ? meta.error
    : '';
  return (
    <TextField
      className={disabled ? classes.root : ""}
      error={Boolean(errorText)}
      helperText={errorText}
      type={type}
      placeholder={placeholder}
      variant={variant || 'outlined'}
      {...field}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
}



export default withStyles(
  styles,
  { 'withTheme': true }
)(BCTextField);