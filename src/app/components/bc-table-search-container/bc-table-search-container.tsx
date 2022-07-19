import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import styles from './bc-table-search-container.styles';
import { IconButton, InputBase, Paper, withStyles } from '@material-ui/core';


interface BCTableSearchInputProps {
  classes: any;
  searchText: string,
  handleSearchChange: any
  handleSearchReset: any
  searchPlaceholder: string
}

function BCTableSearchContainer({
  classes,
  searchText,
  handleSearchChange,
  handleSearchReset,
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
        // defaultValue={searchText}
      />
      {searchText && (
        <>
          <IconButton
            aria-label={'clear'}
            className={classes.iconButton}
            onClick={handleSearchReset}
          >
            <ClearIcon />
          </IconButton>
          <div className={classes.iconButtonBorder} />
        </>
      )}
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
