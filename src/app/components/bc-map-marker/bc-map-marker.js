import React, {useState} from "react";
import {useDispatch} from "react-redux";
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
import {IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import {withStyles} from "@material-ui/core/styles";
import styles from "./bc-map-marker.style";
import './bc-map-marker.scss';

function BCMapMarker({ ...props }) {
  let CustomIcon;
  const { lat, lng, showPins } = props;
  const [showInfo, setShowinfo] = useState(false);
  const dispatch = useDispatch();
  const title = props.ticket.tasks.length === 1 ?props.ticket.tasks[0].jobType.title : 'Multiple Jobs';

  const getStatusIcon = (status) => {
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

  const openCreateJobModal = (ticketObj) => {
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

  const openDetailJobModal = (job) => {
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

  return <div style={{marginLeft: -10, marginTop: -10}}
    //onMouseLeave={() => setShowinfo(false)}
  >
    {(() => {
      const status = props?.ticket?.status;
      CustomIcon = getStatusIcon(status);
    })()}
    <CustomIcon
      className={props.classes.marker}
      onClick={(e) => setShowinfo(true)}
    />
    {showInfo && <div
      className={`${props.classes.markerPopup} marker_dropdown elevation-4`}
      style={{
        'width': '270px',
      }}>
      <div className={'action-container'}>
        <IconButton className={'no-padding'} onClick={() => setShowinfo(false)}>
          <CloseIcon style={{color: '#BDBDBD'}}/>
        </IconButton>
      </div>
      <div className={'title-container'}>
        <CustomIcon />
        <span>{title}</span>
      </div>
      <span className={'company'}>Norton Fitness</span>
      <hr />
      <div className={'date-container'}>
        <span>Description</span>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span className={'date'}>
              {props.ticket.scheduleDate ? new Date(props.ticket.scheduleDate).toString()
                .substr(0, 15) : ''}
            </span>
          <InfoIcon style={{ fontSize: 14, marginLeft: 5 }} onClick={() => openDetailJobModal(props.ticket)}/>
        </div>
      </div>
      <span className={'note'}>
          {props.ticket.ticket.note ? props.ticket.ticket.note : 'N/A'}
        </span>
    </div>}
  </div>
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapMarker);
