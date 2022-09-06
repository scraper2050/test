import {
  Grid, IconButton, Typography,
  withStyles
} from '@material-ui/core';
import React from 'react';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import styles from './bc-job-request.styles';

interface PROPS {
  classes?: any;
  windowRequest: any;
  isWindowServiceNeeded?: boolean;
  index: number;
  collapsed: boolean;
  onChangeCollapse: () => void;
}

function BCJobRequestSummary({
  classes,
  windowRequest,
  isWindowServiceNeeded = false,
  index,
  collapsed,
  onChangeCollapse
}: PROPS): JSX.Element {
  const summary = () => {
    const {screen, glass} = windowRequest;
    let summaryText = [];
    if (screen) {
      summaryText.push(`Screens: ${screen.isScreenWholeHouse ? 'Whole house' : screen.required ? 'Yes' : 'No'}`)
    } else {
      summaryText.push('Screens: No');
    }

    if (glass.windowType) {
      summaryText.push('Reglaze: Yes');
      summaryText.push(`Frame: ${glass.frameColor ? 'Yes' : 'No'}`);
    } else {
      summaryText.push('Reglaze: No');
    }

    summaryText.push(`Service: ${isWindowServiceNeeded ? 'Yes' : 'No'}`);
    return summaryText.join('; ');
  }

  return  <Grid container className={classes.gridWrapper} justify={'space-between'}>
    <Grid item xs>
      <Typography variant={'caption'} className={classes.summaryCaption}>job request {index}</Typography>
      <Typography variant={'h6'} className={classes.summaryTextBig}>{windowRequest.title}</Typography>
    </Grid>
    <Grid item xs>
      <Typography variant={'caption'} className={classes.summaryCaption}>location and floor</Typography>
      <Typography variant={'h6'} className={classes.summaryText}>{windowRequest.locationFloor}</Typography>
    </Grid>
    <Grid item xs>
      <Typography variant={'caption'} className={classes.summaryCaption}>reason for service or repair</Typography>
      <Typography variant={'h6'} className={classes.summaryText}>{windowRequest.reasonForOrder}</Typography>
    </Grid>
    <Grid item xs>
      <Typography variant={'caption'} className={classes.summaryCaption}>summary</Typography>
      <Typography variant={'h6'} className={classes.summaryText}>{summary()}</Typography>
    </Grid>
    <Grid item>
    <IconButton
      className={classes.collapseButton}
      onClick={onChangeCollapse}
    >
      {collapsed ? <ExpandMore /> : <ExpandLess />}
    </IconButton>
    </Grid>
  </Grid>
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCJobRequestSummary);

