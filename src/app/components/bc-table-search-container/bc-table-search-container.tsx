import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styles from './bc-table-search-container.styles';
import { IconButton, InputBase, Paper, withStyles } from '@material-ui/core';

interface BCTableSearchInputProps {
  classes: any;
  searchText: string,
  handleSearchChange: any
  searchPlaceholder: string
}

function BCTableSearchContainer({
  classes,
  searchText,
  handleSearchChange,
  searchPlaceholder
}: BCTableSearchInputProps): JSX.Element {
  return (
    <Paper classes={{ 'root': classes.searchContainer }}>
      <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        name={'searchText'}
        onChange={(event: any) => {
          handleSearchChange(event);
        }}
        placeholder={searchPlaceholder}
        value={searchText}
        defaultValue={searchText}
      />
      <IconButton
        aria-label={'search'}
        className={classes.iconButton}
        type={'submit'}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCTableSearchContainer);
