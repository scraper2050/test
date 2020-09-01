import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styles from './bc-spinner.styles';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  classes: any
}

function BCSpinner({ classes }: Props) {
  return (
    <div className={classes.root}>
      <CircularProgress size={60} />
    </div>
  );
}

export default withStyles(styles)(BCSpinner);
