import React from 'react';

import TextField from '@material-ui/core/TextField';

import { FormDataModel } from '../../Models/FormData';

interface PhonNumberInputProps {
  label: string;
  size: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
  inputData: FormDataModel;
  changeData: Function;
}

export default function PhoneNumberInput({
  label,
  size,
  variant = 'outlined',
  inputData,
  changeData,
}: PhonNumberInputProps) {
  const getMaskString = (): string => {
    const x = inputData.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!x) return '';
    return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  };

  const handleChangeValue = (e: any): void => {
    changeData({
      ...inputData,
      value: e.target.value,
    });
  };

  return (
    <TextField
      label={label}
      size={size}
      variant={variant}
      type={'text'}
      fullWidth
      error={!inputData.validate}
      helperText={inputData.errorMsg}
      value={getMaskString()}
      onChange={handleChangeValue}
    />
  );
}
