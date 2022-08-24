import {Grid, TextField, Typography, withStyles} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import styles from '../window/bc-job-request.styles';
import classNames from "classnames";
import BCMapWithMarker from "../../bc-map-with-marker/bc-map-with-marker";
import {Line, RequestAutocomplete, TopMarginedContainer} from "../window/bc-components";
import Autocomplete, {createFilterOptions} from "@material-ui/lab/Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {
  clearJobSiteStore,
  getJobSites
} from "../../../../actions/job-site/job-site.action";

interface PRORS {
  classes: any,
  isChanging: boolean;
  jobRequest: any;
  customerContact: any;
  newLocation: any,
  newSite: any,
}

function BCJobRequestMap({
   classes, isChanging, jobRequest, customerContact, newLocation, newSite
 }: PRORS): JSX.Element {
  const jobLocations = useSelector((state: any) => state.jobLocations.data);
  const jobSites = useSelector((state: any) => state.jobSites.data);

  // const [jobLocation, setJobLocation] = useState<any>(jobRequest?.jobLocation);
  // const [jobSite, setJobSite] = useState<any>(jobRequest.jobSite);


  const dispatch = useDispatch();
  const filter = createFilterOptions();

  let positionValue: { lat?: number; long?: number } = {};
  if (jobRequest.jobSite?.location?.coordinates?.length === 2) {
    positionValue.long = jobRequest.jobSite.location.coordinates[0];
    positionValue.lat = jobRequest.jobSite.location.coordinates[1];
  } else if (jobRequest.jobLocation?.location?.coordinates?.length === 2) {
    positionValue.long = jobRequest.jobLocation.location.coordinates[0];
    positionValue.lat = jobRequest.jobLocation.location.coordinates[1];
  }

  useEffect(() => {
    dispatch(getJobSites({
      'customerId': jobRequest.customer._id,
      'locationId': newLocation?._id,
    }));
  }, [newLocation]);

  return <>
    <Grid container className={classes.gridWrapper} justify={'space-between'}>
      <Grid item xs={12} sm={4}>
        <TopMarginedContainer>
          <Typography variant={'caption'}
                      className={'previewCaption'}>{'Subdivision'}</Typography>
          {isChanging ?
            <RequestAutocomplete
              fullWidth={false}
              getOptionLabel={(option: any) => option.name ? option.name : ''}
              // getOptionDisabled={(option) => !option.isActive}
              id={'tags-standard'}
              onChange={(ev: any, newValue: any) => {
                dispatch(clearJobSiteStore());
                //setJobLocation(newValue);
                // setJobSite(null);
              }}
              options={jobLocations && jobLocations.length !== 0 ? jobLocations.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
              renderInput={params =>
                <TextField
                  {...params}
                  variant={'outlined'}
                />
              }
              value={newLocation}
            />
            :
            <Typography>{jobRequest.jobLocation?.name || 'N/A'}</Typography>
          }
        </TopMarginedContainer>
        <TopMarginedContainer>
          <Typography
            variant={'caption'}
            className={'previewCaption'}>{'Address'}</Typography>
          {isChanging ?
            <RequestAutocomplete
              // className={detail ? 'detail-only' : ''}
              // disabled={FormikValues.jobLocationId === '' || isLoadingDatas || detail || !!ticket.jobCreated}
              getOptionLabel={(option: any) => option.name ? option.name : ''}
              id={'tags-standard'}
              // freeSolo
              // selectOnFocus
              // clearOnBlur
              // handleHomeEndKeys
              //onChange={(ev: any, newValue: any) => handleJobSiteChange(ev, 'jobSiteId', setFieldValue, newValue)}
              options={jobSites && jobSites.length !== 0 ? jobSites.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
              renderInput={params =>
                <TextField
                  {...params}
                  variant={'outlined'}
                />
              }
              value={newSite}
            />
            :
            <Typography>{jobRequest.jobSite?.name || 'N/A'}</Typography>
          }
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

