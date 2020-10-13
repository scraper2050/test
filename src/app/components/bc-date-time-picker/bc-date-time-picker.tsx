import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';

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
  disablePast = false,
  name = '',
  placeholder = 'Enter Date',
  label = '',
  inputVariant = 'outlined',
  variant = 'inline',
  dateFormat = 'MM/dd/yyyy',
  pickerType = 'date',
  required = false }: any) {
  const classes = useStyles();
  return (
    <FormControl className={classes.fullWidth}>
      <Typography
        gutterBottom
        variant={'subtitle1'}>
        {`${label}`}
        {required
          ? <sup style={{ 'color': '#C00707' }}>
            {'*'}
          </sup>
          : null}
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {
          pickerType === 'date'
            ? <DatePicker
              autoOk
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
              ampm={false}
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
              views={['hours', 'minutes', 'seconds']}
            />
        }
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}

export default BCDateTimePicker;
