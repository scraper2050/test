import {Grid, Typography, withStyles} from '@material-ui/core';
import React from 'react';
import styles from './bc-job-request.styles';
import {formatDate} from "../../../../helpers/format";

interface PROPS {
  classes?: any;
  jobRequest: any;
}

function BCJobRequestHeader({
                              classes,
                              jobRequest,
                            }: PROPS): JSX.Element {
  return <Grid container className={'modalPreview'} justify={'space-around'}>
    <Grid item xs>
      <Typography variant={'caption'}
                  className={'previewCaption'}>customer</Typography>
      <Typography variant={'h6'}
                  className={'bigText'}>{jobRequest.customer?.profile?.displayName || 'N/A'}</Typography>
    </Grid>
    <Grid item xs>
      <Typography variant={'caption'} className={'previewCaption'}>due
        date</Typography>
      <Typography variant={'h6'}
                  className={'previewTextTitle'}>{jobRequest.dueDate ? formatDate(jobRequest.dueDate) : 'N/A'}</Typography>
    </Grid>
    <Grid item xs>
      <Typography variant={'caption'}
                  className={'previewCaption'}>manufacturer</Typography>
      <Typography variant={'h6'} className={'previewTextTitle'}
                  style={{textTransform: 'capitalize'}}>{jobRequest.windows[0].manufacturer}</Typography>
    </Grid>
    <Grid item xs>
      <Typography variant={'caption'}
                  className={'previewCaption'}>category</Typography>
      <Typography variant={'h6'} className={'previewTextTitle'}
                  style={{textTransform: 'capitalize'}}>Windows</Typography>
    </Grid>
    <Grid item xs>
      <Typography variant={'caption'}
                  className={'previewCaption'}>total</Typography>
      <Typography variant={'h6'} className={'previewTextTitle'}
                  style={{textTransform: 'capitalize'}}>{jobRequest.windows.length}</Typography>
    </Grid>
  </Grid>
}

export default withStyles(
  styles,
  {'withTheme': true},
)(BCJobRequestHeader);

