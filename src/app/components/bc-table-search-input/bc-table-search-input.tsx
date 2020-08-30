import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { IconButton, InputBase, Paper } from '@material-ui/core';

interface BCTableSearchInputProps {
  style?: any;
  searchStr: string;
  setSearchStr: Function;
  onSearch: Function;
}

function BCTableSearchInput({
  style,
  searchStr,
  setSearchStr,
  onSearch
}: BCTableSearchInputProps): JSX.Element {
  return (
    <StyledPaper style={style}>
      <StyledInputBase
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e => setSearchStr(e.target.value)}
        placeholder={'Search... (Keyword, Date, Tags, etc.)'}
        value={searchStr}
      />

      <StyledSearchButton
        aria-label={'search'}
        onClick={() => {
          onSearch(searchStr);
        }}
        type={'button'}>
        <SearchIcon />
      </StyledSearchButton>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  position: relative;
  border-radius: 2px;
  height: 38px;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  height: 100%;
  padding: 11px 11px 11px 40px;
  font-size: 16px;
  line-height: 17px;
`;

const StyledSearchButton = styled(IconButton)`
  position: absolute;
  left: 10px;
  top: 7px;
  padding: 0;
  width: 24px;
  height: 24px;
`;

export default BCTableSearchInput;
