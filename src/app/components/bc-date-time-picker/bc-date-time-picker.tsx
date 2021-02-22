import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, TimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  'datePicker': {
    '& input': {
      'padding': '11px 26px 11px 12px'
    }
  },
  'fullWidth': {
    'margin-bottom': '5px',
    'width': '100%'
  }
}));

function BCDateTimePicker({
  handleChange,
  value,
  ampm = false,
  views = ['hours', 'minutes', 'seconds'],
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
  required = false }: any) {
  const classes = useStyles();
  return (
    <FormControl className={classes.fullWidth}>
      <Typography
        gutterBottom
        className={className}
        variant={'subtitle1'}>
        <strong>
          {`${label}`}
        </strong>
        {required
          ? <sup style={{ 'color': '#C00707' }}>
            {'*'}
          </sup>
          : null}
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {
          pickerType === 'date'
            ? <KeyboardDatePicker
              autoOk
              disabled={disabled}
              className={classes.datePicker}
              disablePast={disablePast}
              format={dateFormat}
              id={`datepicker-${name}`}
              inputProps={{
                'name': name,
                'placeholder': placeholder
              }}
              inputVariant={inputVariant}
              name={name}
              onChange={(e: any) => {
                handleChange(e);
              }}
              required={required}
              value={value}
              variant={variant}
            />
            : <TimePicker
              disabled={disabled}
              ampm={ampm}
              autoOk
              className={classes.datePicker}
              format={dateFormat}
              id={`timepicker-${name}`}
              inputProps={{
                'name': name,
                'placeholder': placeholder
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
              views={views}
            />
        }
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}

export default BCDateTimePicker;
