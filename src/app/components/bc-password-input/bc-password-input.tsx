import { FormDataModel } from '../../models/form-data';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    'showpassowrdbtn': {
      'backgroundColor': '#fff',
      'padding': '2px',
      'position': 'absolute',
      'right': '25px',
      'top': '17px',
      'zIndex': 999
    }
  }));

interface BCPasswordInputProps {
  id?: string;
  label?: string;
  size: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
  inputData: FormDataModel;
  onChange: Function;
}

function BCPasswordInput({
  id = 'password',
  label = 'Password',
  variant = 'outlined',
  size = 'small',
  inputData,
  onChange
}: BCPasswordInputProps) {
  const classes = useStyles();

  const handleChangePassword = (e: any): void => {
    const passwordValue = e.target.value;
    //const validRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gu;
    onChange({
      'errorMsg': passwordValue.length > 0
        ? (passwordValue.length < 8
          ? 'Password must be equal or more than 8 characters'
  //        : !passwordValue.match(validRegex)
  //          ? 'Password must contain at least one upper case letter, one number, and one special character'
            : ''
          )
        : 'This field is required',
      'validate': passwordValue.length >= 8, // && passwordValue.match(validRegex),
      'value': passwordValue
    });
  };

  return (
    <>
      <TextField
        error={!inputData.validate}
        fullWidth
        helperText={inputData.errorMsg}
        id={id}
        label={label}
        onChange={handleChangePassword}
        size={size}
        type={inputData.showPassword
          ? 'text'
          : 'password'}
        value={inputData.value}
        variant={variant}
      />
      <IconButton
        aria-label={'toggle password visibility'}
        className={classes.showpassowrdbtn}
        onClick={(e): void => {
          onChange({
            ...inputData,
            'showPassword': !inputData.showPassword
          });
        }}
        onMouseDown={e => {
          e.preventDefault();
        }}>
        {inputData.showPassword
          ? <Visibility />
          : <VisibilityOff />}
      </IconButton>
    </>
  );
}

export default BCPasswordInput;
