import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles(theme => ({
  'input': {
    '&:focus': {
      'borderColor': '#80bdff',
      'borderRadius': 4,
      'boxShadow': '0 0 0 0.2rem rgba(0,123,255,.25)'
    },
    'backgroundColor': theme.palette.background.paper,
    'border': '1px solid #ced4da',
    'borderRadius': 4,
    'fontFamily': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    'fontSize': 16,
    'padding': '10px 26px 10px 12px',
    'position': 'relative',
    'transition': theme.transitions.create(['border-color', 'box-shadow'])
  },
  'root': {
    'label + &': {
      // 'marginTop': theme.spacing(3)
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  'fullWidth': {
    'margin-bottom': '9px',
    'position': 'relative',
    'width': '100%'
  },
  'helpText': {
    'bottom': '-14px',
    'color': 'red',
    'fontSize': '12px',
    'position': 'absolute',
    'right': '0'
  }
}));

function BCSelectOutlined({ handleChange, error, value, name = '', items = {
  'data': [],
  'displayKey': '',
  'valueKey': ''
}, label = '', required = false }: any) {
  const classes = useStyles();
  return (
    <FormControl className={classes.fullWidth}>
      <Typography
        variant={'subtitle1'}>
        {label}
        {required
          ? <sup style={{ 'color': '#C00707' }}>
            {'*'}
          </sup>
          : null}
      </Typography>
      <Select
        id={'bc-select-outlined'}
        input={<BootstrapInput />}
        labelId={'bc-select-outlined-label'}
        name={name}
        onChange={(e: any) => {
          handleChange(e);
        }}
        required={required}
        value={value}>
        <MenuItem value={''}>
          <em>
            {'None'}
          </em>
        </MenuItem>
        {
          items.data.map((item: any, index: number) =>
            <MenuItem
              key={index}
              value={item[items.valueKey]}>
              {item[items.displayKey]}
            </MenuItem>)
        }
      </Select>
      {
        error && error.isError
          ? <span className={classes.helpText}>
            {error.message || ''}
          </span>
          : null
      }
    </FormControl>
  );
}

export default BCSelectOutlined;
