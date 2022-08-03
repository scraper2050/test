import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as IconStarted} from "../../../assets/img/icons/map/icon-started.svg";
import {ReactComponent as IconCompleted} from "../../../assets/img/icons/map/icon-completed.svg";
import {ReactComponent as IconCancelled} from "../../../assets/img/icons/map/icon-cancelled.svg";
import {ReactComponent as IconRescheduled} from "../../../assets/img/icons/map/icon-rescheduled.svg";
import {ReactComponent as IconPaused} from "../../../assets/img/icons/map/icon-paused.svg";
import {ReactComponent as IconIncomplete} from "../../../assets/img/icons/map/icon-incomplete.svg";
import {ReactComponent as IconPending} from "../../../assets/img/icons/map/icon-pending.svg";
import {ReactComponent as IconJobRequest} from "../../../assets/img/icons/map/icon-job-request.svg";
import {ReactComponent as IconOpenServiceTicket} from "../../../assets/img/icons/map/icon-open-service-ticket.svg";
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
import {
  setServiceTicket,
} from "actions/service-ticket/service-ticket.action";
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
import {getServiceTicketDetail} from "../../../api/service-tickets.api";
import { getAllJobTypesAPI } from 'api/job.api';
import { getJobLocation } from 'api/job-location.api';
import { getJobSite } from 'api/job-site.api';
import {formatDate, formatTime} from "../../../helpers/format";
import {
  getJobTypesFromJob,
  getJobTypesFromTicket,
  getJobTypesTitle
} from "../../../helpers/utils";

interface Props {
  classes: any,
  ticket: any,
  lat: number,
  lng: number,
  isTicket?: boolean,
  id?: string,
}

function BCMapMarker({classes, ticket, isTicket = false, id = ''}: Props) {
  let CustomIcon;
  const [showInfo, setShowInfo] = useState({show: false, inside: true});
  const dispatch = useDispatch();

  const title = getJobTypesTitle(isTicket ? getJobTypesFromTicket(ticket) : getJobTypesFromJob(ticket));

  const note = ticket.description || ticket.note || 'N/A';
  const notes = note.length > 500 ? `${note.substr(0, 500)}...` : note;
  const selected = useSelector((state: RootState) => state.map.ticketSelected);
  const { tickets, stream } = useSelector(({ serviceTicket }: any) => ({tickets: serviceTicket.tickets, stream: serviceTicket.stream}));

  useEffect(() => {
    if(!stream){
      localStorage.removeItem('afterCancelJob')
    }
  }, [stream])
  

  useEffect(() => {
    if (selected._id === ticket._id) {
      setShowInfo({show: true, inside: false});
    }
    else if (!showInfo.inside) {
      setShowInfo({show: false, inside: true})
    }

  }, [selected]);

  const getStatusIcon = (status: number) => {
    switch (status) {
      case -2:
        return IconJobRequest;
      case -1:
        return IconOpenServiceTicket;
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

  const openCreateJobModal = () => {  
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
          'jobFromRequest': !!ticket.requestId,
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

  const openEditTicketModal = (ticket: any) => {
    const reqObj = {
      customerId: ticket.customer?._id,
      locationId: ticket.jobLocation?._id || ticket.jobLocation
    }
    if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
      dispatch(loadingJobSites());
      dispatch(getJobSites(reqObj));
    } else {
      dispatch(clearJobSiteStore());
    }
    dispatch(getAllJobTypesAPI());
    ticket.updateFlag = true;
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit Service Ticket',
        'removeFooter': false,
        'ticketData': ticket,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'refreshTicketAfterEditing': false,
        'onSubmit': async (response: any, ticketId: string) => {
          closeInfo();
          let data = {...ticket, images: []};
          const {status, serviceTicket} = await getServiceTicketDetail(ticket._id);
          if (status === 1) {
            data = serviceTicket;
          }
          let updatedJobLocation: any;
          if(data?.jobLocation?._id){
            const response = await getJobLocation(data?.jobLocation?._id);
            if(response.length && response[0]?.location?.coordinates?.length){
              updatedJobLocation = {...data.jobLocation, location: response[0].location}
            } else {
              updatedJobLocation = {...data.jobLocation}
            }
          }
          let updatedJobSite: any;
          if(data?.jobSite?._id){
            const response = await getJobSite(data?.jobSite?._id);
            if(response.length && response[0]?.location?.coordinates?.length){
              updatedJobSite = {...data.jobSite, location: response[0].location}
            } else {
              updatedJobSite = {...data.jobSite}
            }
          }
          const { customer, customerContactId, customerPO, dueDate, images, note, tasks, track } = data;
          const updatedTickets = tickets.map((ticket:any, index: number)=>{
            if(ticket._id === ticketId){
              const newTicket = {
                ...ticket,
                customer,
                customerContactId,
                customerPO,
                dueDate,
                images,
                note,
                tasks,
                track,
              };
              if(updatedJobLocation){
                newTicket.jobLocation = updatedJobLocation;
              } else {
                newTicket.jobLocation = null;
              }
              if(updatedJobSite){
                newTicket.jobSite = updatedJobSite;
              } else {
                newTicket.jobSite = null;
              }
              return newTicket;
            }
            return ticket
          });
          dispatch(setServiceTicket(updatedTickets));
        }
      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const openDetailJobModal = (job: any) => {
    dispatch(setModalDataAction({
      'data': {
        job: job,
        modalTitle: '',
        removeFooter: true,
        maxHeight: '100%',
      },
      'type': modalTypes.VIEW_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openViewTicketModal = async(ticket: any) => {
    let data = {...ticket, images: []};
    try {
      const {status, serviceTicket} = await getServiceTicketDetail(ticket._id);
      if (status === 1) {
        data = serviceTicket;
      }
    } catch (e) {
      console.log(e);
    }
    dispatch(setModalDataAction({
      'data': {
        'job': data,
        'modalTitle': '',
        'removeFooter': true,
      },
      'type': modalTypes.VIEW_SERVICE_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openViewJobRequestModal = async(jobRequest: any) => {
    dispatch(
      setModalDataAction({
        data: {
          jobRequest: jobRequest,
          removeFooter: false,
          maxHeight: '100%',
          modalTitle: 'Job Request',
        },
        type: modalTypes.VIEW_JOB_REQUEST_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const closeInfo = () => {
    if (showInfo.inside) {
      setShowInfo({show: false, inside: true});
    } else {
      dispatch(setTicketSelected({_id: ''}));
    }
  }

  const scheduleDate = isTicket ? ticket.dueDate : ticket.scheduleDate;

  const jobTime = () => {
    let text = '';
    if (ticket.scheduledStartTime) {
      text += formatTime(ticket.scheduledStartTime);
      if (ticket.scheduledEndTime) {
        text += ' - ' + formatTime(ticket.scheduledEndTime);
      }
    } else {
      text += ' N/A';
    }
    return text;
}
  interface Task {
    employeeType:boolean;
    contractor?: {
      info: {
        companyName: string;
        companyEmail: string
      };
    };
    technician?: {
      profile: {
        displayName: string;
      }
    }
  }

  const techs = ticket.tasks.map((task:Task):string=>{
    let tech = '';
    if(task.employeeType && task.contractor){
      tech = `${task.contractor.info.companyName}`
    } else if(task.technician){
      tech = `${task.technician.profile.displayName}`
    }
    return tech
  })

  return <div
    className={classes.marker}
    style={{zIndex: showInfo.show ? 10 : 1}}
    //onMouseLeave={() => setShowinfo(false)}
  >
    {(() => {
      const status = isTicket 
        ? ticket?.ticketId 
          ? -1
          : -2 
        : ticket?.status;
      CustomIcon = getStatusIcon(status);
    })()}
    <span
      id={id}
      onClick={(e) => setShowInfo({ show: true, inside: true })}>
      <CustomIcon />
    </span>
    {showInfo.show && <div
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
      <span className={'company'}>
        {ticket.jobLocation && ticket.jobLocation.name ? ticket.jobLocation.name : ` `}
      </span>
      <hr />
      <div className={'date-container'}>
        <span>Description</span>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span className={'date'}>
              {scheduleDate ? formatDate(scheduleDate) : ''}
            </span>
          <InfoIcon
            className={'info-button'}
            onClick={() => isTicket 
              ? ticket?.ticketId 
                ? openViewTicketModal(ticket) 
                : openViewJobRequestModal(ticket)
              : openDetailJobModal(ticket)}
          />
        </div>
      </div>
      <span className={'note'}>
        {notes}
      </span>
      {!isTicket &&
      <span className={'note'}><strong>Suggested Time: </strong>{jobTime()}</span>
      }
      {techs.map((tech:string, index:number) => (
        <div key={index}>
          <span><strong>{tech}</strong></span>
        </div>
      ))}
      {isTicket && ticket.customer?._id &&
        <div className={'button-wrapper-ticket'}>
          <div>
            {ticket?.ticketId && <Button disabled={stream && !!localStorage.getItem('afterCancelJob')} onClick={() => openEditTicketModal(ticket)}>Edit Ticket</Button>}
          </div>
          <div>
            <Button onClick={() => openCreateJobModal()}>Create Job</Button>
          </div>
        </div>
      }
    </div>}
  </div>
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapMarker);
