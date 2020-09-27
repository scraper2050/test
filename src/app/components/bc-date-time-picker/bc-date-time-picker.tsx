import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
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
  dateFormat = 'yyyy-MM-dd',
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
        <DatePicker
          autoOk
          className={'mt-8 mb-16 w-full'}
          disablePast={disablePast}
          format={dateFormat}
          id={'scheduleDate'}
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
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}

export default BCDateTimePicker;
