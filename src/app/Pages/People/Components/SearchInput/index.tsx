import React from 'react';

import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface SearchInputProps {
  style?: any;
  searchStr: string;
  setSearchStr: Function;
  onSearch: Function;
}

const SearchInput = ({ style, searchStr, setSearchStr, onSearch }: SearchInputProps): JSX.Element => {
  return (
    <StyledPaper style={style}>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchStr}
        onChange={(e) => setSearchStr(e.target.value)}
      />
      <StyledSearchButton
        type="button"
        aria-label="search"
        onClick={() => {
          onSearch(searchStr);
        }}
      >
        <SearchIcon />
      </StyledSearchButton>
    </StyledPaper>
  );
};

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

export default SearchInput;
