import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './bc-back-button.style';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  link: string;
  classes: any;
}

function BCBackButton({ link, classes }: Props) {
  return (
    <Link
      to={link}
      className={classes.centerIcon}
    >
      <IconButton
        className={classes.roundBackground}
        color={'primary'}>
        <ArrowBackIcon fontSize={'small'} />
      </IconButton>
    </Link>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCBackButton);
