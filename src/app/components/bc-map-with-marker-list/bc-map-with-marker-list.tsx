import Config from '../../../config';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import styles from './bc-map-with-marker-list.style';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalTypes } from '../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';

interface BCMapWithMarkerListProps {
    ticketList: any,
    classes: any,
    lat: any,
    lng: any,
}


function MakerPin({ ...props }) {
    
    const dispatch = useDispatch();
    let p = props.lat;
    const openCreateJobModal = (ticketObj: any) => {
      const reqObj = {
        customerId: ticketObj.customer._id,
        locationId: ticketObj.jobLocation ? ticketObj.jobLocation._id : ''
      }
      if(!reqObj.locationId){
        dispatch(loadingJobLocations());
        dispatch(getJobLocationsAction(reqObj.customerId));
      }
      if(reqObj.locationId){
        dispatch(loadingJobSites());
        dispatch(getJobSites(reqObj));
      }else {
        dispatch(clearJobSiteStore());
      }
       const ticket = {...ticketObj, 
        jobLocation: reqObj.locationId,
        jobSite: ticketObj.jobSite ? ticketObj.jobSite._id : ''
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
              'scheduleDate': new Date(),
              'scheduledEndTime': null,
              'scheduledStartTime': null,
              'technician': {
                '_id': ''
              },
              ticket,
              'type': {
                '_id': ''
              }
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
    if(props.ticket && props.openTicketObj && props.openTicketObj._id === props.ticket._id){
        return(
          <>
            <RoomIcon className={props.classes.marker} />;
            <div className={props.classes.markerPopup}>
              <div>
                <span>{props.ticket.dueDate ? new Date(props.ticket.dueDate).toString().substr(0, 15) : ''}</span>
              </div>
              <div>
                <span>Job Type</span><br></br>
                <span>{props.ticket.jobType ? props.ticket.jobType.title : ''}</span>
              </div>
              <div>
                <span>Notes</span><br></br>
                <span>{props.ticket.note ? props.ticket.note : ''}</span>
              </div>
              {props.ticket.ticketId}
              <button onClick={() => openCreateJobModal(props.ticket)}>Create Job</button>
            </div>
        </>
        )
    } else
    return <RoomIcon className={props.classes.marker} />;
}

function BCMapWithMarkerWithList({ classes, ticketList, lat, lng }: BCMapWithMarkerListProps) {
    const openTicketObj = useSelector((state: any) => state.serviceTicket.openTicketObj);
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ 'key': Config.REACT_APP_GOOGLE_KEY }}
            center={{ lat: 32.3182314, lng: -86.902298 }}
            onClick={(event) => console.log(event)}
            defaultZoom={3}>
            {
                ticketList.map((ticket: any, index: number) => {
                    let lat;
                    let lng;
                    if (ticket.jobSite) {
                        lat = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[1] ? ticket.jobSite.location.coordinates[1] : 0;
                        lng = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[0] ? ticket.jobSite.location.coordinates[0] : 0;
                    } else if (ticket.jobLocation) {
                        lat = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[1] ? ticket.jobLocation.location.coordinates[1] : 0;
                        lng = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[0] ? ticket.jobLocation.location.coordinates[0] : 0;
                    } else if (ticket.customer) {
                        lat = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[1] ? ticket.customer.location.coordinates[1] : 0;
                        lng = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[0] ? ticket.customer.location.coordinates[0] : 0;
                    }

                    return <MakerPin
                        key={index}
                        classes={classes}
                        lat={lat}
                        lng={lng}
                        ticket={ticket}
                        openTicketObj={openTicketObj}
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