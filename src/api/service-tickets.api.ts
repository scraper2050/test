import request from '../utils/http.service';
import { refreshServiceTickets, setServiceTicket, setServiceTicketLoading } from 'actions/service-ticket/service-ticket.action';

export const getAllServiceTicketAPI = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setServiceTicketLoading(true));
      request(`/getServiceTickets`, 'post', null)
        .then((res: any) => {
          dispatch(setServiceTicket(res.data.serviceTickets));
          dispatch(setServiceTicketLoading(false));
          dispatch(refreshServiceTickets(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setServiceTicketLoading(false));
          return reject(err);
        });
    });
  };
};

export const callCreateTicketAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/createServiceTicket`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const callEditTicketAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/updateServiceTicket`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
