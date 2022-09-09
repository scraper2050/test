import { Notification } from 'reducers/notifications.types';
import { modalTypes } from '../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getjobDetailAPI } from 'api/job.api';
import { getAllJobRequestAPI } from 'api/job-request.api';
import { markNotificationAsRead } from 'actions/notifications/notifications.action';

export const openDetailJobModal = (dispatch: (action:any)=>void, notification:Notification) => {
  dispatch(setModalDataAction({
    'data': {
      'modalTitle': 'Service Ticket Details',
      'removeFooter': false,
      'className': 'serviceTicketTitle',
      'maxHeight': '754px',
      'height': '100%',
      'ticketId': notification.metadata._id,
      'notificationId': notification._id
    },
    'type': modalTypes.VIEW_SERVICE_TICKET_MODAL
  }));
  setTimeout(() => {
    dispatch(openModalAction());
  }, 200);
};

export const openDetailTicketModal = async (dispatch: (action:any)=>void, notification:Notification) => {
  const data = {
    jobId: notification?.metadata?._id
  }
  let job: any = await getjobDetailAPI(data);
  job.jobRescheduled = notification?._id;
  dispatch(setModalDataAction({
    'data': {
      'detail': true,
      'job': job,
      'modalTitle': 'View Job',
      'removeFooter': false
    },
    'type': modalTypes.EDIT_JOB_MODAL
  }));
  setTimeout(() => {
    dispatch(openModalAction());
  }, 200);
};

export const openContractModal = (dispatch: (action:any)=>void, notification:Notification) => {
  dispatch(setModalDataAction({
    'data': {
      'removeFooter': false,
      'maxHeight': '450px',
      'height': '100%',
      'message': notification.message,
      'contractId': notification.metadata._id,
      'notificationType': notification.notificationType,
      'notificationId': notification._id
    },
    'type': modalTypes.CONTRACT_VIEW_MODAL
  }));
  setTimeout(() => {
    dispatch(openModalAction());
  }, 200);
};

export const openJobRequestModal = async (dispatch: (action:any)=>void, notification:Notification) => {
  const result:any = await dispatch(getAllJobRequestAPI(30, undefined, undefined, '-1', '', undefined));
  const matchedJobRequest = result?.jobRequests?.filter((jobRequest:any) => jobRequest._id === notification.metadata?._id)
  if(matchedJobRequest && matchedJobRequest.length){
    dispatch(
      markNotificationAsRead.fetch({ id: notification?._id, isRead: true })
    );
    dispatch(
      setModalDataAction({
        data: {
          jobRequest: matchedJobRequest[0],
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
  }
};

export const openJobRequestModalFromChat = async (dispatch: (action:any)=>void, notification:Notification | any) => {
  const result:any = await dispatch(getAllJobRequestAPI(30, undefined, undefined, '-1', '', undefined));
  const matchedJobRequest = result?.jobRequests?.filter((jobRequest:any) => jobRequest._id === (notification.metadata?.jobRequest?._id || notification.metadata?.jobRequest))
  if(matchedJobRequest && matchedJobRequest.length){
    dispatch(
      markNotificationAsRead.fetch({ id: notification?._id, isRead: true })
    );
    dispatch(
      setModalDataAction({
        data: {
          jobRequest: {...matchedJobRequest[0], tab: 1},
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
  }
};
