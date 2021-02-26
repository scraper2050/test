import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

interface BCToolBarSearchInputProps {
  style?: any;
}

function BCToolBarSearchInput({ style }: BCToolBarSearchInputProps): JSX.Element {
  return (
    <StyledPaper style={style}>
      <StyledInputBase
        inputProps={{ 'aria-label': 'search google maps' }}
        placeholder={'Search...'}
      />
      <StyledSearchButton
        aria-label={'search'}
        type={'button'}>
        <SearchIcon />
      </StyledSearchButton>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  position: relative !important;
  border-radius: 2px !important;
  height: 38px !important;
`;

const StyledInputBase = styled(InputBase)`
  width: 100% !important;
  height: 100%  !important;
  padding: 11px 40px 11px 11px !important;
  font-size: 16px !important;
  line-height: 17px !important;
`;

const StyledSearchButton = styled(IconButton)`
  position: absolute !important;
  right: 10px !important;
  top: 7px !important;
  padding: 0 !important;
  width: 24px !important;
  height: 24px !important;
`;

export default BCToolBarSearchInput;
