import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';


interface DebounceInputProps {
    value: string;
    setValue: (val:string)=>void
    id: string;
    error: boolean;
}

export default function BCDebouncedInput({ value, setValue, id, error }:DebounceInputProps) {
  const [inputValue, setInputValue] = useState(value);


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
    onChange={debounceChange}
    type={'text'}
    value={inputValue}
    variant={'outlined'}
  />;
}
