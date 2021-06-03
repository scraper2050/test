import { Notification } from 'reducers/notifications.types';
import { modalTypes } from '../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getjobDetailAPI } from 'api/job.api';

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
  const job: any = await getjobDetailAPI(data);
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
