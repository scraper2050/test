import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';

import './bc-input.scss';

const useStyles = makeStyles(theme => ({
  'fullWidth': {
    'margin-bottom': '5px',
    'width': '100%'
  },
  'inputBox': {
    'marginTop': '0px',
    'marginBottom': (props: {dense: boolean}) => props.dense ? '0px' : undefined,
    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    }
  },
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
  required=false,
  dense=false,
  ...props
}: any) {
  const classes = useStyles({dense});
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
            <>
              <Typography
                className={className}
                variant={'subtitle1'}>
                {label}
                {required && <Typography
                  color={'error'}
                  display={'inline'}
                  style={{ 'lineHeight': '1' }}>
                  {' *'}
                </Typography>}
              </Typography>

            </>
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
          required={required}
          value={value}
          variant={variant}
          {...props}
        />
      </FormControl>

  );
}

export default memo(BCInput);
