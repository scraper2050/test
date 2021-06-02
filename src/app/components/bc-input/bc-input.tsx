import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';

import './bc-input.scss';

const useStyles = makeStyles(theme => ({
  'fullWidth': {
    'margin-bottom': '5px',
    'width': '100%'
  },
  'inputBox': {
    'marginTop': '0px'
  }
}));

function BCInput({
  handleChange,
  value,
  name = '',
  multiline = false,
  label = '',
  rows = 4,
  placeholder = '',
  variant = 'outlined',
  className = '',
  margin = 'normal',
  type = 'text',
  ...props
}: any) {
  const classes = useStyles();
  const additionalProps: any = {
    'multiline': false
  };
  if (multiline) {
    additionalProps.rows = rows;
  }
  return (
    name === 'exp'
      ? <>
        {label !== '' &&
          <Typography
            className={className}
            variant={'subtitle1'}>
            {label}
          </Typography>
        }
        <MaskedInput
          autoComplete={'off'}
          className={'masked-input'}
          id={'outlined-textarea-mask'}
          mask={[/\d/u, /\d/u, '/', /\d/u, /\d/u]}
          name={name}
          onChange={(e: any) => handleChange(e)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </>
      : <FormControl className={classes.fullWidth}>
        {
          label !== '' &&
            <Typography
              className={className}
              variant={'subtitle1'}>
              {label}
            </Typography>
        }

        <TextField
          autoComplete={'off'}
          className={classes.inputBox}
          id={'outlined-textarea'}
          label={''}
          margin={margin}
          multiline={multiline}
          name={name}
          onChange={(e: any) => handleChange(e)}
          placeholder={placeholder}
          rows={rows}
          type={type}
          value={value}
          variant={variant}
          {...props}
        />
      </FormControl>

  );
}

export default BCInput;
