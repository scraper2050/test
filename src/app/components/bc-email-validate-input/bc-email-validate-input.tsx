import { FormDataModel } from '../../models/form-data';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';


interface BCEmailValidateInputProps {
  id?: string;
  label?: string;
  size: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
  inputData: FormDataModel;
  onChange: Function;
}

function BCEmailValidateInput({
  id = 'email',
  label = 'Email',
  variant = 'outlined',
  size = 'small',
  inputData,
  onChange
}: BCEmailValidateInputProps) {
  const handleChangeEmail = (e: any) => {
    const emailData = {
      'errorMsg': '',
      'validate': true,
      'value': e.target.value
    };

    if (e.target.value.length === 0) {
      emailData.validate = false;
      emailData.errorMsg = 'This filed required';
    } else if (validator.isEmail(emailData.value)) {
      emailData.validate = true;
      emailData.errorMsg = '';
    } else {
      emailData.validate = false;
      emailData.errorMsg = 'This field must be a valid email address';
    }

    onChange({
      ...emailData
    });
  };

  return (
    <TextField
      error={!inputData.validate}
      fullWidth
      helperText={inputData.errorMsg}
      id={id}
      label={label}
      onChange={handleChangeEmail}
      size={size}
      type={'email'}
      value={inputData.value}
      variant={variant}
    />
  );
}

export default BCEmailValidateInput;
