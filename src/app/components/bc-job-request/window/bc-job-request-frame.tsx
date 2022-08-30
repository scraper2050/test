import {
  Grid, Typography,
  withStyles
} from '@material-ui/core';
import React from 'react';
import styles from './bc-job-request.styles';
import {Tab} from "./bc-components";

function BCJobRequestFrame({
  classes,
  frame,
  index,
}: any): JSX.Element {

  return  <Grid container direction={'column'} className={classes.gridWrapper} >
    <Tab title='Frame' />
    <Grid container direction={'row'} className={classes.innerGrid}>
      <Grid item xs>
        <Typography variant={'caption'} className={classes.summaryCaption}>vinyl color</Typography>
        <div className={classes.glassImageWrapper}>
          <Typography variant={'h6'} className={classes.summaryText}>
            {frame.name}
          </Typography>
          <div className={classes.frameColor} style={{backgroundColor: frame.hexColor}}/>
        </div>
      </Grid>
    </Grid>
  </Grid>
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCJobRequestFrame);


