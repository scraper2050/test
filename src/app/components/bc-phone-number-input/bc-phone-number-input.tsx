import { FormDataModel } from '../../models/form-data';
import React from 'react';
import TextField from '@material-ui/core/TextField';

interface BCPhonNumberInputProps {
  id?: string;
  label: string;
  size: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
  validate?: boolean;
  inputData: FormDataModel;
  changeData: Function;
}

export default function BCPhoneNumberInput({
  id = 'phone_number',
  label,
  size,
  variant = 'outlined',
  validate,
  inputData,
  changeData
}: BCPhonNumberInputProps) {
  const getMaskString = (): string => {
    const x = inputData.value
      .replace(
        /\D/gu,
        ''
      )
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/u);
    if (!x) {
      return '';
    }
    return !x[2]
      ? x[1]
      : `(${x[1]}) ${x[2]}${x[3]
        ? `-${x[3]}`
        : ''}`;
  };

  const handleChangeValue = (e: any): void => {
    if (!e.target.value || e.target.value.length === 0) {
      if (validate) {
        changeData({
          'errorMsg': 'This field is required',
          'validate': false,
          'value': ''
        });
      } else {
        changeData({
          'errorMsg': '',
          'validate': true,
          'value': ''
        });
      }
    } else {
      const value = e.target.value.match(/\d+/gu);
      if (!value) {
        changeData({
          'errorMsg': 'This filed must be a valid phone number address',
          'validate': false,
          'value': ''
        });
      } else {
        let strValue = parseFloat(value.join().replace(
          /,/gu,
          ''
        )).toString();
        if (strValue.length > 10) {
          strValue = strValue.substring(
            0,
            10
          );
        }
        changeData({
          'errorMsg':
            strValue.length === 10
              ? ''
              : 'This filed must be a valid phone number address',
          'validate': strValue.length === 10,
          'value': strValue
        });
      }
    }
  };

  return (
    <TextField
      error={!inputData.validate}
      fullWidth
      helperText={inputData.errorMsg}
      id={id}
      label={label}
      onChange={handleChangeValue}
      size={size}
      type={'text'}
      value={getMaskString()}
      variant={variant}
    />
  );
}
