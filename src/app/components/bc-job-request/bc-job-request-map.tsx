import {Grid, Typography, withStyles} from '@material-ui/core';
import React from 'react';
import styles from './bc-job-request.styles';
import classNames from "classnames";
import BCMapWithMarker from "../bc-map-with-marker/bc-map-with-marker";
import {Line, TopMarginedContainer} from "./bc-components";

function BCJobRequestMap({
                           classes,
                           jobRequest,
                           customerContact,
                         }: any): JSX.Element {
  let positionValue: { lat?: number; long?: number } = {};
  if (jobRequest.jobSite?.location?.coordinates?.length === 2) {
    positionValue.long = jobRequest.jobSite.location.coordinates[0];
    positionValue.lat = jobRequest.jobSite.location.coordinates[1];
  } else if (jobRequest.jobLocation?.location?.coordinates?.length === 2) {
    positionValue.long = jobRequest.jobLocation.location.coordinates[0];
    positionValue.lat = jobRequest.jobLocation.location.coordinates[1];
  }

  return <>
    <Grid container className={classes.gridWrapper} justify={'space-between'}>
      <Grid item xs={12} sm={4}>
        <TopMarginedContainer>
          <Typography variant={'caption'}
                      className={'previewCaption'}>{'Subdivision'}</Typography>
          <Typography>{jobRequest.jobLocation?.name || 'N/A'}</Typography>
        </TopMarginedContainer>
        <TopMarginedContainer>
          <Typography variant={'caption'}
                      className={'previewCaption'}>{'Address'}</Typography>
          <Typography>{jobRequest.jobSite?.name || 'N/A'}</Typography>
        </TopMarginedContainer>
        <Grid container direction={'row'} justify={'space-between'}>
          <TopMarginedContainer>
            <Typography variant={'caption'}
                        className={'previewCaption'}>{'Contact Associated'}</Typography>
            <Typography>{customerContact || 'N/A'}</Typography>
          </TopMarginedContainer>
          <TopMarginedContainer>
            <Typography variant={'caption'}
                        className={'previewCaption'}>{'Warranty or PO number'}</Typography>
            <Typography>{jobRequest.customerPO || 'N/A'}</Typography>
          </TopMarginedContainer>
          <TopMarginedContainer/>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TopMarginedContainer>
          <div className={classNames(classes.paper, classes.mapWrapper)}>
            <BCMapWithMarker
              lang={positionValue.long}
              lat={positionValue.lat}
            />
          </div>
        </TopMarginedContainer>
      </Grid>
    </Grid>
    <Grid container direction={'column'} className={classes.gridWrapper}>
      <TopMarginedContainer>
        <Line/>
      </TopMarginedContainer>
    </Grid>
  </>
}

export default withStyles(
  styles,
  {'withTheme': true},
)(BCJobRequestMap);

