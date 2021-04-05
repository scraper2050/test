import FormControl from "@material-ui/core/FormControl";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import MaskedInput from 'react-text-mask'
import './bc-input.scss'

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    "margin-bottom": "5px",
    width: "100%",
  },
  inputBox: {
    marginTop: "0px"
  }
}));

function BCInput({
  handleChange,
  value,
  name = "",
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
  const additionalProps: any = {
    multiline: false,
  };
  if (multiline) {
    additionalProps.rows = rows;
  }
  return (
    <>
    {name === "exp" ?
    <>
      {label !== "" &&
        <Typography className={className} variant={"subtitle1"}>
          {label}
        </Typography>
      }
      <MaskedInput
        mask={[/\d/, /\d/, '/', /\d/, /\d/]}
        type={type}
        id={"outlined-textarea-mask"}
        className="masked-input"
        name={name}
        onChange={(e: any) => handleChange(e)}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
      />
    </>
 :
    <FormControl className={classes.fullWidth}>
      {
        label !== "" &&
        <Typography className={className} variant={"subtitle1"}>
          {label}
        </Typography>
      }

      <TextField
        type={type}
        className={classes.inputBox}
        id={"outlined-textarea"}
        label={""}
        multiline={multiline}
        name={name}
        onChange={(e: any) => handleChange(e)}
        placeholder={placeholder}
        rows={rows}
        value={value}
        variant={variant}
        autoComplete="off"
        margin={margin}
      />
    </FormControl>
    }
    </>
  );
}

export default BCInput;
