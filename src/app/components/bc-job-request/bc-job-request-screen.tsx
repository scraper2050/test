import {
  Grid, Typography,
  withStyles
} from '@material-ui/core';
import React from 'react';
import styles from './bc-job-request.styles';
import {Tab} from "./bc-components";

function BCJobRequestScreen({
  classes,
  screen,
  index,
}: any): JSX.Element {

  return  <Grid container direction={'column'} className={classes.gridWrapper} >
    <Tab title='Screens' />
    <Grid container direction={'row'} className={classes.innerGrid}>
      <Grid item xs>
        <Typography variant={'caption'} className={classes.summaryCaption}>scope</Typography>
        <Typography variant={'h6'} className={classes.summaryText}>
          {screen.isScreenWholeHouse ? 'Whole house' : screen.required ? 'Individual' : 'None'}
        </Typography>
      </Grid>

    </Grid>
  </Grid>
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCJobRequestScreen);


