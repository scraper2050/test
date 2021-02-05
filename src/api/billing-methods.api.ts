import request from '../utils/http.service';
import { refreshServiceTickets, setServiceTicket, setServiceTicketLoading, setOpenServiceTicketLoading, setOpenServiceTicket } from 'actions/service-ticket/service-ticket.action';


export const getAllBillingMethodsAPI = () => {
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

export const AddBillingMethodAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/add-billing-method`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const EditBillingMethodAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/edit-billing-method`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
