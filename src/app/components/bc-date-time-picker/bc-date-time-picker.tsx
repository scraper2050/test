import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    '& input': {
      padding: '11px 26px 11px 12px',
    },
  },
  fullWidth: {
    'margin-bottom': '5px',
    width: '100%',
  },
}));

function BCDateTimePicker({
  handleChange,
  value,
  ampm = true,
  views = ['hours', 'minutes'],
  disabled = false,
  disablePast = false,
  name = '',
  placeholder = 'Enter Date',
  label = '',
  inputVariant = 'outlined',
  variant = 'inline',
  dateFormat = 'MM/dd/yyyy',
  pickerType = 'date',
  className = '',
  required = false,
  invalidMessage = 'Please select a correct date',
  minDateMessage = 'Cannot select a date that has already passed',
  TextField,
}: any) {
  const classes = useStyles();
  return (
    <FormControl className={classes.fullWidth}>
      <Typography className={className} gutterBottom variant={'subtitle1'}>
        <strong>{`${label}`}</strong>
        {required ? <sup style={{ color: '#C00707' }}>{'*'}</sup> : null}
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {pickerType === 'date' ? (
          <KeyboardDatePicker
            autoOk
            className={classes.datePicker}
            disabled={disabled}
            disablePast={disablePast}
            format={dateFormat}
            id={`datepicker-${name}`}
            inputProps={{
              name: name,
              placeholder: placeholder,
            }}
            inputVariant={inputVariant}
            name={name}
            onChange={(e: any) => {
              handleChange(e);
            }}
            required={required}
            value={value}
            invalidDateMessage={invalidMessage}
            variant={variant}
            TextFieldComponent={TextField}
            minDateMessage={minDateMessage}
          />
        ) : (
          <KeyboardTimePicker
            ampm={ampm}
            autoOk
            className={classes.datePicker}
            disabled={disabled}
            id={`timepicker-${name}`}
            inputProps={{
              name: name,
              placeholder: placeholder,
            }}
            inputVariant={inputVariant}
            label={''}
            name={name}
            onChange={(e: any) => {
              handleChange(e);
            }}
            required={required}
            value={value}
            variant={variant}
            invalidDateMessage={minDateMessage}
            views={views}
          />
        )}
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}

export default BCDateTimePicker;
