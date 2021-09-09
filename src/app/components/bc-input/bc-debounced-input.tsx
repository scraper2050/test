import React, { useEffect, useState } from 'react';
import {createStyles, makeStyles, TextField} from '@material-ui/core';
import {Theme} from "@material-ui/core/styles";


interface DebounceInputProps {
    value: string;
    setValue: (val:string)=>void
    id: string;
    error: boolean;
}

const useDebounceInputStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      '& .MuiOutlinedInput-input': {
        padding: '5px 10px',
      }
    }
  })
)

export default function BCDebouncedInput({ value, setValue, id, error }:DebounceInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const debounceInputStyles = useDebounceInputStyles();

  const debounceChange = (e:any) => {
    setInputValue(e.target.value);
  };


  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setValue(inputValue);
      }, 500);
      return () => clearTimeout(timeout);
    }

    , [inputValue]
  );


  return <TextField
    error={error}
    id={id}
    classes={{root: debounceInputStyles.textField}}
    onChange={debounceChange}
    type={'text'}
    value={inputValue}
    variant={'outlined'}
  />;
}
