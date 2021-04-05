/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    "margin-bottom": "5px",
    width: "100%",
  },
  inputBox: {
    marginTop: "0px"
  }
}));

export default function AutoComplete({
  handleChange,
  value,
  name = "",
  data = [],
  multiline = false,
  label = "",
  rows = 4,
  placeholder = "",
  variant = "outlined",
  className = "",
  margin = "normal",
  type = "text"
}: any) {
  const classes = useStyles();
  const [aValue, setValue] = React.useState<string | null>();
  const [inputValue, setInputValue] = React.useState('');
  return (
    <FormControl className={classes.fullWidth}>
    {
      label !== "" &&
      <Typography className={className} variant={"subtitle1"}>
        {label}
      </Typography>
    }
    <Autocomplete
      id="state"
      options={data}
      // value={value}
      // onChange={(event: any, newValue: string | null) => {
      //   let virtualEvent = {
      //     target: {
      //       value: newValue ? newValue : "",
      //       id: 'state',
      //       name: 'state',
      //     }
      //   }
      //   handleChange(virtualEvent);
      // }}
      inputValue={value}
      onInputChange={(event, newInputValue) => {
        let virtualEvent = {
          target: {
            id: name,
            name: name,
            value: newInputValue ? newInputValue : '' 
          }
        }
        handleChange(virtualEvent);
      }}
      getOptionLabel={(option:any) => option.name}
      renderInput={(params) => <TextField 
        {...params} 
        label=""
        value={value}
        className={classes.inputBox}
        onChange={handleChange}
        variant={variant}
        id={"outlined-textarea"}
        margin={margin}
      />}
    />
  </FormControl>
  );
}
