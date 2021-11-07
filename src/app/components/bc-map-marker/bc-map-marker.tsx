import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as IconStarted} from "../../../assets/img/icons/map/icon-started.svg";
import {ReactComponent as IconCompleted} from "../../../assets/img/icons/map/icon-completed.svg";
import {ReactComponent as IconCancelled} from "../../../assets/img/icons/map/icon-cancelled.svg";
import {ReactComponent as IconRescheduled} from "../../../assets/img/icons/map/icon-rescheduled.svg";
import {ReactComponent as IconPaused} from "../../../assets/img/icons/map/icon-paused.svg";
import {ReactComponent as IconIncomplete} from "../../../assets/img/icons/map/icon-incomplete.svg";
import {ReactComponent as IconPending} from "../../../assets/img/icons/map/icon-pending.svg";
import {
  getJobLocationsAction,
  loadingJobLocations
} from "../../../actions/job-location/job-location.action";
import {
  clearJobSiteStore,
  getJobSites,
  loadingJobSites
} from "../../../actions/job-site/job-site.action";
import {
  openModalAction,
  setModalDataAction
} from "../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../constants";
import {Button, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import {withStyles} from "@material-ui/core/styles";
import styles from "./bc-map-marker.style";
import './bc-map-marker.scss';
import {openDetailTicketModal} from "../../pages/notifications/notification-click-handlers";
import {RootState} from "../../../reducers";
import {setTicketSelected} from "../../../actions/map/map.actions";

interface Props {
  classes: any,
  ticket: any,
  lat: number,
  lng: number,
  isTicket?: boolean,
}

function BCMapMarker({classes, ticket, isTicket = false}: Props) {
  let CustomIcon;
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  const title = ticket.tasks.length === 1 ?ticket.tasks[0].jobType.title : 'Multiple Jobs';
  const note = ticket.description || ticket.note || 'N/A';
  const notes = note.length > 500 ? `${note.substr(0, 500)}...` : note;
  const selected = useSelector((state: RootState) => state.map.ticketSelected);

  useEffect(() => {
    setShowInfo(selected._id === ticket._id);
  }, [selected]);

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1:
        return IconStarted;
      case 2:
        return IconCompleted;
      case 3:
        return IconCancelled;
      case 4:
        return IconRescheduled;
      case 5:
        return IconPaused;
      case 6:
        return IconIncomplete;
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

  const openEditTicketModal = (ticket: any) => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'View Service Ticket',
        'removeFooter': false,
        'detail': true,
        'ticketData': ticket,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%'
      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const closeInfo = () => {
    dispatch(setTicketSelected({_id: ''}));
    //setShowInfo(false);
  }

  return <div style={{marginLeft: -10, marginTop: -10}}
    //onMouseLeave={() => setShowinfo(false)}
  >
    {(() => {
      const status = ticket?.status;
      CustomIcon = getStatusIcon(status);
    })()}
    <CustomIcon
      className={classes.marker}
      onClick={(e) => setShowInfo(true)}
    />
    {showInfo && <div
      className={`${classes.markerPopup} marker_dropdown elevation-4`}
      style={{
        'width': '270px',
      }}>
      <div className={'action-container'}>
        <IconButton className={'no-padding'} onClick={closeInfo}>
          <CloseIcon style={{color: '#BDBDBD'}}/>
        </IconButton>
      </div>
      <div className={'title-container'}>
        <CustomIcon />
        <span>{title}</span>
      </div>
      <span className={'company'}>{ticket.customer?.profile?.displayName || 'Norton Fitness'}</span>
      <hr />
      <div className={'date-container'}>
        <span>Description</span>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span className={'date'}>
              {ticket.scheduleDate ? new Date(ticket.scheduleDate).toString()
                .substr(0, 15) : ''}
            </span>
          <InfoIcon
            style={{ fontSize: 14, marginLeft: 5 }}
            onClick={() => isTicket ? openEditTicketModal(ticket) : openDetailJobModal(ticket)}
          />
        </div>
      </div>
      <span className={'note'}>
        {notes}
      </span>
      {isTicket &&
        <div className={'button-wrapper'}>
          <Button onClick={() => openCreateJobModal(ticket)}>Create Job</Button>
        </div>
      }
    </div>}
  </div>
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapMarker);
