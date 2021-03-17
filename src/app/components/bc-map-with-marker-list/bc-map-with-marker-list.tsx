import Config from '../../../config';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import styles from './bc-map-with-marker-list.style';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalTypes } from '../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';
import NoLogoImage from 'assets/img/avatars/NoImageFound.png'
import InfoIcon from '@material-ui/icons/Info';

import "./bc-map-with-marker.scss";
const DEFAULT_LAT = 51.477222;
const DEFAULT_LNG = 0;

interface BCMapWithMarkerListProps {
  list: any,
  classes: any,
  lat?: any,
  lng?: any,
  hasPhoto?: any,
  selected?: any,
  onJob?: boolean
}
function createMapOptions() {
  return {
    gestureHandling: 'greedy'
  };
}


function MakerPin({ ...props }) {

  const dispatch = useDispatch();

  const openCreateJobModal = (ticketObj: any) => {
    const reqObj = {
      customerId: ticketObj.customer._id,
      locationId: ticketObj.jobLocation ? ticketObj.jobLocation._id : ''
    }
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
      jobLocation: reqObj.locationId,
      jobSite: ticketObj.jobSite ? ticketObj.jobSite._id : '',
      jobType: ticketObj.jobType ? ticketObj.jobType._id : '',
      dueDate: ticketObj.dueDate ? ticketObj.dueDate : '',
      description: ticketObj.note ? ticketObj.note : ''
    }

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
          'jobFromMap': true,
        },
        'modalTitle': 'Create Job',
        'removeFooter': false,

      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openDetailJobModal = (job: any) => {
    dispatch(
      setModalDataAction({
        data: {
          job: job,
          detail: true,
          modalTitle: "View Job",
          removeFooter: false,
        },
        type: modalTypes.EDIT_JOB_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };



  if (props.onJob && props.ticket && props.openTicketObj && props.openTicketObj._id === props.ticket._id) {

    if (props.lat === 0 && props.lng === 0) {

      return (
        <></>
      )
    } else {
      return (
        <>
          <RoomIcon className={props.classes.marker} />;
          <div className={`${props.classes.markerPopup} marker_dropdown elevation-4`}
            style={{
              width: props.ticket.ticket.image ? '370px' : '200px'
            }}
          >
            <div className="due_date">
              <span> <i className="material-icons">access_time</i> {props.ticket.scheduleDate ? new Date(props.ticket.scheduleDate).toString().substr(0, 15) : ''}</span>
              <div
                onClick={() => openDetailJobModal(props.ticket)}
                style={{
                  marginLeft: '.5rem', height: 34,
                  display: 'flex',
                  alignItems: 'center',
                }}
                className={'flex items-center'}>
                <InfoIcon style={{ margin: 'auto, 0' }} />
              </div>
            </div>
            <Grid container justify="space-between" alignItems="center" spacing={3}>
              <Grid item>
                <div className="job-type">
                  <h3>Job Type</h3>
                  <span>{props.ticket.type ? props.ticket.type.title : ''}</span>
                </div>
                <div className="job-type">
                  <h3>Description</h3>
                  <span>{props.ticket.description ? props.ticket.description : ''}</span>
                </div>
              </Grid>


              {
                props.ticket.ticket.image &&
                <Grid item>
                  <Grid container
                    direction="column"
                    spacing={3}
                    alignItems="center"
                    justify="center">
                    <div
                      className={props.classes.uploadImageNoData}
                      style={{
                        'backgroundImage': `url(${props.ticket.ticket.image})`,
                        'border': `2px solid #00aaff`,
                        'backgroundSize': 'cover',
                        'backgroundPosition': 'center',
                        'backgroundRepeat': 'no-repeat',
                      }}
                    />
                  </Grid>
                </Grid>
              }
            </Grid>
          </div>
        </>
      )
    }
  }


  if (props.ticket && props.openTicketObj && props.openTicketObj._id === props.ticket._id) {

    if (props.lat === 0 && props.lng === 0) {
      return (
        <></>
      )
    } else {
      return (
        <>
          <RoomIcon className={props.classes.marker} />;
          <div className={`${props.classes.markerPopup} marker_dropdown elevation-4`}
            style={{
              width: props.ticket.image ? '370px' : '200px'
            }}
          >
            <div className="due_date">
              <span> <i className="material-icons">access_time</i> {props.ticket.dueDate ? new Date(props.ticket.dueDate).toString().substr(0, 15) : ''}</span>
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
            <Grid container justify="space-between" alignItems="center" spacing={3}>
              <Grid item>
                <div className="job-type">
                  <h3>Job Type</h3>
                  <span>{props.ticket.jobType ? props.ticket.jobType.title : ''}</span>
                </div>
                <div className="job-type">
                  <h3>Notes</h3>
                  <span>{props.ticket.note ? props.ticket.note : ''}</span>
                </div>
              </Grid>


              {
                props.ticket.image &&
                <Grid item>
                  <Grid container
                    direction="column"
                    spacing={3}
                    alignItems="center"
                    justify="center">
                    <div
                      className={props.classes.uploadImageNoData}
                      style={{
                        'backgroundImage': `url(${props.ticket.image})`,
                        'border': `2px solid #00aaff`,
                        'backgroundSize': 'cover',
                        'backgroundPosition': 'center',
                        'backgroundRepeat': 'no-repeat',
                      }}
                    />
                  </Grid>
                </Grid>
              }
            </Grid>
            {
              !props.onJob &&
              <div className="button_wrapper">
                <button onClick={() => openCreateJobModal(props.ticket)}>Create Job</button>
              </div>
            }
          </div>
        </>
      )
    }
  } else {
    if (props.lat === 0 && props.lng === 0) {
      return <></>
    } else {
      return <RoomIcon className={props.classes.marker} />;
    }

  }

}

function BCMapWithMarkerWithList({ classes, list, selected = {}, hasPhoto = false, lat, lng, onJob = false }: BCMapWithMarkerListProps) {
  const [tickets, setTickets] = useState<any>(list);

  let centerLat = DEFAULT_LAT, centerLng = DEFAULT_LNG;


  if (selected.jobSite) {
    centerLat = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[1] ? selected.jobSite.location.coordinates[1] : DEFAULT_LAT;
    centerLng = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[0] ? selected.jobSite.location.coordinates[0] : DEFAULT_LNG;
    centerLat = centerLat - .004;
    centerLng = centerLng + (hasPhoto ? .006 : .002);
  } else if (selected.jobLocation) {
    centerLat = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[1] ? selected.jobLocation.location.coordinates[1] : DEFAULT_LAT;
    centerLng = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[0] ? selected.jobLocation.location.coordinates[0] : DEFAULT_LNG;
    centerLat = centerLat - .004;
    centerLng = centerLng + (hasPhoto ? .006 : .002);
  } else if (selected.customer) {
    centerLat = selected.customer.location && selected.customer.location.coordinates.length > 1 && selected.customer.location.coordinates[1] ? selected.customer.location.coordinates[1] : 30;
    centerLng = selected.customer.location && selected.customer.location.coordinates.length > 1 && selected.customer.location.coordinates[0] ? selected.customer.location.coordinates[0] : 30;
    centerLat = centerLat - .004;
    centerLng = centerLng + (hasPhoto ? .006 : .002);
  }


  useEffect(() => {
    if (tickets.length === 0) {
      setTickets(list)
    }

  }, [list]);


  return (
    <GoogleMapReact
      bootstrapURLKeys={{ 'key': Config.REACT_APP_GOOGLE_KEY }}
      onClick={(event) => console.log(event)}
      center={{ lat: centerLat, lng: centerLng }}
      options={createMapOptions}
      defaultZoom={15}>

      {/* <MakerPin
        classes={classes}
        lat={centerLat + .002}
        lng={centerLat - (hasPhoto ? .006 : .002)}
        ticket={openTicketObj}
        openTicketObj={openTicketObj}
      /> */}
      {
        list.map((ticket: any, index: number) => {
          let lat = 30, lng = 30;
          if (ticket.jobSite) {
            lat = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[1] ? ticket.jobSite.location.coordinates[1] : 0;
            lng = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[0] ? ticket.jobSite.location.coordinates[0] : 0;
          } else if (ticket.jobLocation) {
            lat = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[1] ? ticket.jobLocation.location.coordinates[1] : 0;
            lng = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[0] ? ticket.jobLocation.location.coordinates[0] : 0;
          } else if (ticket.customer) {
            lat = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[1] ? ticket.customer.location.coordinates[1] : 30;
            lng = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[0] ? ticket.customer.location.coordinates[0] : 30;
          }



          return <MakerPin
            key={index}
            classes={classes}
            lat={lat}
            lng={lng}
            ticket={ticket}
            tickets={list}
            openTicketObj={selected}
            onJob={onJob}
          />

        })
      }

    </GoogleMapReact>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapWithMarkerWithList);