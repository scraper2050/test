import Config from '../../../config';
import GoogleMapReact from 'google-map-react';
import styles from './bc-map-with-routes.style';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';
import NoLogoImage from 'assets/img/avatars/NoImageFound.png';
import InfoIcon from '@material-ui/icons/Info';
import { bcMapStyle } from './bc-map-style';

import { ReactComponent as IconCancelled } from 'assets/img/icons/map/icon-cancelled.svg';
import { ReactComponent as IconCompleted } from 'assets/img/icons/map/icon-completed.svg';
import { ReactComponent as IconPending } from 'assets/img/icons/map/icon-pending.svg';
import { ReactComponent as IconStarted } from 'assets/img/icons/map/icon-started.svg';

import './bc-map-with-routes.scss';
import {JobRoute} from "../../../actions/job-routes/job-route.types";
import {Job} from "../../../actions/job/job.types";
import {Polyline} from "@react-google-maps/api";
const DEFAULT_LAT = 32.3888811;
const DEFAULT_LNG = -98.6732501;

interface BCMapWithMarkerListProps {
  //list: any,
  classes: any,
  routes: JobRoute[],
  onJob?: boolean,
  showPins?: boolean
}

interface MarkerPosition {
  lat: number;
  long: number;
}

function createMapOptions() {
  return {
    styles: bcMapStyle,
    'gestureHandling': 'greedy'
  };
}

const getColor = (str: string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function MakerPin({ ...props }) {
  let CustomIcon;
  const { lat, lng, showPins } = props;
  const [showInfo, setShowinfo] = useState(false);
  const dispatch = useDispatch();

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 1:
        return IconStarted;
      case 2:
        return IconCompleted;
      case 3:
        return IconCancelled;
      default:
        return IconPending;
    }
  }

  const openCreateJobModal = (ticketObj: any) => {
    const reqObj = {
      'customerId': ticketObj.customer._id,
      'locationId': ticketObj.jobLocation ? ticketObj.jobLocation._id : ''
    };
    if (!reqObj.locationId) {
      dispatch(loadingJobLocations());
      dispatch(getJobLocationsAction(reqObj.customerId));
    }
    if (reqObj.locationId) {
      dispatch(loadingJobSites());
      dispatch(getJobSites(reqObj));
    } else {
      dispatch(clearJobSiteStore());
    }
    const ticket = {
      ...ticketObj,
      'jobLocation': reqObj.locationId,
      'jobSite': ticketObj.jobSite ? ticketObj.jobSite._id : '',
      'jobType': ticketObj.jobType ? ticketObj.jobType._id : '',
      'dueDate': ticketObj.dueDate ? ticketObj.dueDate : '',
      'description': ticketObj.note ? ticketObj.note : ''
    };


    dispatch(setModalDataAction({
      'data': {
        'job': {
          'customer': {
            '_id': ''
          },
          'description': '',
          'employeeType': false,
          'equipment': {
            '_id': ''
          },
          'scheduleDate': null,
          'scheduledEndTime': null,
          'scheduledStartTime': null,
          'technician': {
            '_id': ''
          },
          ticket,
          'type': {
            '_id': ''
          },
          'jobFromMap': true
        },
        'modalTitle': 'Create Job',
        'removeFooter': false

      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openDetailJobModal = (job: any) => {
    dispatch(setModalDataAction({
      'data': {
        'job': job,
        'detail': true,
        'modalTitle': 'View Job',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  if (props.onJob && props.ticket && props.openTicketObj && props.openTicketObj._id === props.ticket._id) {
    return (
      <>
        {(() => {
            const status = props?.openTicketObj?.status;
            CustomIcon = getStatusIcon(status);
          })()}
        <CustomIcon className={props.classes.marker} />
{/*        { checkIfDefault(lat, lng) &&
          <CustomIcon className={props.classes.marker} />
        }*/}
        {';'}
        <div
          className={`${props.classes.markerPopup} marker_dropdown elevation-4`}
          style={{
            'width': props.ticket.ticket.image ? '370px' : '200px'
          }}>
          <div className={'due_date'}>
            <span>
              {' '}
              <i className={'material-icons'}>
                {'access_time'}
              </i>
              {' '}
              {props.ticket.scheduleDate ? new Date(props.ticket.scheduleDate).toString()
                .substr(0, 15) : ''}
            </span>
          </div>
          <Grid
            alignItems={'center'}
            container
            justify={'space-between'}
            spacing={3}>
            <Grid
              item
              xs={6}>
              <div className={'job-type'}>
                <h3>
                  {'Job Type(s)'}
                </h3>
                <span>
                  {props.ticket.tasks.map(({ jobType }:any) => <p>
                    {jobType.title}
                  </p>)}
                </span>
              </div>
              <div className={'job-type'}>
                <h3>
                  {'Description'}
                </h3>
                <span>
                  {props.ticket.ticket.note ? props.ticket.ticket.note : ''}
                </span>
              </div>
            </Grid>
            {
              props.ticket.ticket.image &&
                <Grid
                  item
                  xs={6}>
                  <Grid
                    alignItems={'center'}
                    container
                    direction={'column'}
                    justify={'center'}
                    spacing={3}>
                    <div
                      className={props.classes.uploadImageNoData}
                      style={{
                        'backgroundImage': `url(${props.ticket.ticket.image})`,
                        'border': `2px solid #00aaff`,
                        'backgroundSize': 'cover',
                        'backgroundPosition': 'center',
                        'backgroundRepeat': 'no-repeat'
                      }}
                    />
                  </Grid>
                </Grid>
            }
          </Grid>
          <div
            className={'flex items-cjobSiteenter'}
            onClick={() => openDetailJobModal(props.ticket)}
            style={{
              'marginLeft': '.5rem',
              'height': 34,
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent': 'center',
              'cursor': 'pointer'
            }}>
            <InfoIcon style={{ 'margin': 'auto, 0' }} />
          </div>
        </div>
      </>
    );
  }

  //console.log('ticket', props.ticket, 'openticket', props.openTicketObj, props.openTicketObj._id, props.ticket._id);
  if (props.ticket && props.openTicketObj && props.openTicketObj._id === props.ticket._id) {
    return (
      <>
        {(() => {
          const status = props?.openTicketObj?.status;
          CustomIcon = getStatusIcon(status);
        })()}
        <CustomIcon className={props.classes.marker}
        />
        {';'}
        <div
          className={`${props.classes.markerPopup} marker_dropdown elevation-4`}
          style={{
            'width': props.ticket.image ? '370px' : '200px'
          }}>
          <div className={'due_date'}>
            <span>
              {' '}
              <i className={'material-icons'}>
                {'access_time'}
              </i>
              {' '}
              {props.ticket.dueDate ? new Date(props.ticket.dueDate).toString()
                .substr(0, 15) : ''}
            </span>
            {/* <div
                onClick={() => openDetailJobModal(props.ticket)}
                style={{
                  marginLeft: '.5rem', height: 34,
                  display: 'flex',
                  alignItems: 'center',
                }}
                className={'flex items-center'}>
                <InfoIcon style={{ margin: 'auto, 0' }} />
              </div> */}
          </div>
          <Grid
            alignItems={'center'}
            container
            justify={'space-between'}
            spacing={3}>
            <Grid item>
              <div className={'job-type'}>
                <h3>
                  {'Job Type'}
                </h3>
                <span>
                  {props.ticket.tasks.map((job: any) => <p>{job?.jobType?.title || job?.title}</p>)}
                </span>
              </div>
              <div className={'job-type'}>
                <h3>
                  {'Notes'}
                </h3>
                <span>
                  {props.ticket.note ? props.ticket.note : ''}
                </span>
              </div>
            </Grid>


            {
              props.ticket.image &&
                <Grid item>
                  <Grid
                    alignItems={'center'}
                    container
                    direction={'column'}
                    justify={'center'}
                    spacing={3}>
                    <div
                      className={props.classes.uploadImageNoData}
                      style={{
                        'backgroundImage': `url(${props.ticket.image})`,
                        'border': `2px solid #00aaff`,
                        'backgroundSize': 'cover',
                        'backgroundPosition': 'center',
                        'backgroundRepeat': 'no-repeat'
                      }}
                    />
                  </Grid>
                </Grid>
            }
          </Grid>
          {
            !props.onJob &&
              <div className={'button_wrapper'}>
                <button onClick={() => openCreateJobModal(props.ticket)}>
                  {'Create Job'}
                </button>
              </div>
          }
        </div>
      </>
    );
  }

/*
  if (!showPins && !(props.openTicketObj._id === props.ticket._id)) {
    return <></>;
  }
*/

/*  return checkIfDefault(lat, lng)
    ? */
    return <div
      onMouseLeave={() => setShowinfo(false)}>
      {(() => {
        const status = props?.ticket?.status;
        CustomIcon = getStatusIcon(status);
      })()}
      <CustomIcon
        className={props.classes.marker}
        onMouseEnter={() => setShowinfo(true)}
      />
      {showInfo && <div
        className={`${props.classes.markerPopup} marker_dropdown elevation-4`}
        style={{
          'width': props.ticket.ticket.image ? '370px' : '200px'
        }}>
        <div className={'due_date'}>
          <span>
            {' '}
            <i className={'material-icons'}>
              {'access_time'}
            </i>
            {' '}
            {props.ticket.scheduleDate ? new Date(props.ticket.scheduleDate).toString()
              .substr(0, 15) : ''}
          </span>
        </div>
        <Grid
          alignItems={'center'}
          container
          justify={'space-between'}
          spacing={3}>
          <Grid
            item
            xs={6}>
            <div className={'job-type'}>
              <h3>
                {'Job Type'}
              </h3>
              <span>
                {props.ticket.tasks.map(({ jobType }:any) => <p key={jobType._id}>
                  {jobType.title}
                </p>)}
              </span>
            </div>
            <div className={'job-type'}>
              <h3>
                {'Description'}
              </h3>
              <span>
                {props.ticket.ticket.note ? props.ticket.ticket.note : ''}
              </span>
            </div>
          </Grid>
          {
            props.ticket.ticket.image &&
            <Grid
              item
              xs={6}>
              <Grid
                alignItems={'center'}
                container
                direction={'column'}
                justify={'center'}
                spacing={3}>
                <div
                  className={props.classes.uploadImageNoData}
                  style={{
                    'backgroundImage': `url(${props.ticket.ticket.image})`,
                    'border': `2px solid #00aaff`,
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'center',
                    'backgroundRepeat': 'no-repeat'
                  }}
                />
              </Grid>
            </Grid>
          }
        </Grid>
        <div
          className={'flex items-cjobSiteenter'}
          onClick={() => openDetailJobModal(props.ticket)}
          style={{
            'marginLeft': '.5rem',
            'height': 34,
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center',
            'cursor': 'pointer'
          }}>
          <InfoIcon style={{ 'margin': 'auto, 0' }} />
        </div>
      </div>}
    </div>
    //: null;
}

function BCMapWithRoutes({ classes, routes = [],  onJob = false, showPins = false }: BCMapWithMarkerListProps) {
  const routeData = routes.map((jobRoute: JobRoute) => {
    const coordinates: MarkerPosition[] = [];
      jobRoute.routes.forEach(({job}) => {
        const jobLat = job.jobSite?.location?.coordinates?.[1] ||
          job.jobLocation?.location?.coordinates?.[1] ||
          job.customer?.location?.coordinates?.[1] ||
          DEFAULT_LAT;
        const jobLong = job.jobSite?.location?.coordinates?.[0] ||
          job.jobLocation?.location?.coordinates?.[0] ||
          job.customer?.location?.coordinates?.[0] ||
          DEFAULT_LNG;

        coordinates.push({lat: jobLat, long: jobLong});
        console.log({coordinates})
      });
      return ({...jobRoute, coordinates, color: getColor(jobRoute.technician.profile.displayName)})
  })

  //const calculateMapRegion = () => {
    let latMax=-Infinity, latMin = Infinity, longMax=-Infinity, longMin = Infinity;

    routeData.forEach(route=>
      route.coordinates.forEach(({lat: jobLat, long: jobLong}) => {
        latMax = Math.max(latMax, jobLat);
        latMin = Math.min(latMin, jobLat);
        longMax = Math.max(longMax, jobLong);
        longMin = Math.min(longMin, jobLong);
      })
    );
    const centerLat = routeData.length > 0 ? (latMax + latMin) / 2 : DEFAULT_LAT;
    const centerLng = routeData.length > 0 ? (longMax + longMin) / 2 : DEFAULT_LNG;

    // longitudeDelta: longMax === longMin ? 0.005 : (longMax - longMin) * 1.3,
    // latitudeDelta: latMax === latMin ? 0.004 : (latMax - latMin) * 1.3,

  //}


/*  if (selected.jobSite) {
    centerLat = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[1] ? selected.jobSite.location.coordinates[1] : DEFAULT_LAT;
    centerLng = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[0] ? selected.jobSite.location.coordinates[0] : DEFAULT_LNG;
    centerLat -= 0.004;
    centerLng += 0.002;
  } else if (selected.jobLocation) {
    centerLat = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[1] ? selected.jobLocation.location.coordinates[1] : DEFAULT_LAT;
    centerLng = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[0] ? selected.jobLocation.location.coordinates[0] : DEFAULT_LNG;
    centerLat -= 0.004;
    centerLng += 0.002;
  } else if (selected.customer) {
    centerLat = selected.customer.location && selected.customer.location.coordinates.length > 1 && selected.customer.location.coordinates[1] ? selected.customer.location.coordinates[1] : DEFAULT_LAT;
    centerLng = selected.customer.location?.coordinates?.length > 1 && selected.customer.location?.coordinates[0] ? selected.customer.location.coordinates[0] : DEFAULT_LNG;
    centerLat -= 0.004;
    centerLng += 0.002;
  }*/

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ 'key': Config.REACT_APP_GOOGLE_KEY }}
      center={{ 'lat': centerLat,
        'lng': centerLng }}
      defaultZoom={7}
      onClick={event => console.log(event)}
      options={createMapOptions}>

      {/* <MakerPin
        classes={classes}
        lat={centerLat + .002}
        lng={centerLat - (hasPhoto ? .006 : .002)}
        ticket={openTicketObj}
        openTicketObj={openTicketObj}
      /> */}
      {
        routeData.map((jobRoute) => {
          const options = {
            strokeColor: jobRoute.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 30000,
            paths: jobRoute.coordinates,
            zIndex: 1
          };
          return <Polyline
            //onLoad={onLoad}
            path={jobRoute.coordinates}
            options={options}
          />
        })
      }
      { routeData.map((jobRoute) => {
          return jobRoute.coordinates.map((item: MarkerPosition, index: number) => {


              return <MakerPin
                classes={classes}
                key={index}
                lat={item.lat}
                lng={item.long}
                onJob={onJob}
                openTicketObj={{}}
                showPins={showPins}
                ticket={jobRoute.routes[index].job}
                //tickets={jobRoute.routes}
              />
            }
          )
        })
      }

    </GoogleMapReact>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapWithRoutes);
