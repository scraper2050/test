import { FormDataModel } from '../../models/form-data';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    'showpassowrdbtn': {
      'backgroundColor': '#fff',
      'padding': '2px',
      'position': 'absolute',
      'right': '25px',
      'top': '17px',
      'zIndex': 1
    }
  }));

interface BCUncontrolledPasswordInputProps {
  label?: string;
  size: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
  name: string;
  placeholder: string
}

type Props = BCUncontrolledPasswordInputProps | TextFieldProps

function BCUncontrolledPasswordInput({
  label = 'Password',
  variant = 'outlined',
  size = 'small',
  name = '',
  placeholder,
  ...props
}: Props) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);


  return <InputContainer>
    <InputLabel>
      {label}
    </InputLabel>
    <TextField
      fullWidth
      name={name}
      placeholder={placeholder}
      type={showPassword
        ? 'text'
        : 'password'}
      variant={variant}
      {...props}
    />
    <IconButton
      aria-label={'toggle password visibility'}
      className={classes.showpassowrdbtn}
      onClick={(): void => {
        setShowPassword(!showPassword);
      }}
      onMouseDown={e => {
        e.preventDefault();
      }}>
      {showPassword
        ? <Visibility />
        : <VisibilityOff />}
    </IconButton>
  </InputContainer>;
}


const InputContainer = styled.div`
position: relative;
button {
  top: 37px
}`;

export default BCUncontrolledPasswordInput;
