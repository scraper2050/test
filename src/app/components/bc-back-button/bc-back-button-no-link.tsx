import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './bc-back-button.style';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  func: any;
  classes: any;
}

function BCBackButtonNoLink({ func, classes }: Props) {
  return (
    <div className={classes.centerIcon}>
      <IconButton
        onClick={func}
        className={classes.roundBackground}
        color={'primary'}>
        <ArrowBackIcon fontSize={'small'} />
      </IconButton>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCBackButtonNoLink);
