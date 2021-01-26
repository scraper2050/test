import request from '../utils/http.service';
import { refreshServiceTickets, setServiceTicket, setServiceTicketLoading, setOpenServiceTicketLoading, setOpenServiceTicket } from 'actions/service-ticket/service-ticket.action';


export const getAllServiceTicketAPI = (data?: {
  companyId?: string,
  customerId?: string,
  filterJobs?: boolean,
}) => {
  let customerId = data ? data.customerId : null;
  let filterJobs = data ? data.filterJobs : false;
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setServiceTicketLoading(true));
      request(`/getServiceTickets`, 'post', null)
        .then((res: any) => {
          let oldRes = res;
          let serviceTickets = res.data.serviceTickets;

          if (customerId) {
            serviceTickets = serviceTickets.filter((ticket: any) =>
              ticket.customer._id === customerId);
            if (filterJobs) {
              serviceTickets = serviceTickets.filter((ticket: any) =>
                ticket.jobCreated === false);
            }

            oldRes.data.serviceTickets = serviceTickets;
          }

          dispatch(setServiceTicket(oldRes.data.serviceTickets));
          dispatch(setServiceTicketLoading(false));
          dispatch(refreshServiceTickets(false));
          return resolve(oldRes.data);
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


export const getOpenServiceTickets = (data: {
  pageNo?: number,
  pageSize?: number,
  jobTypeTitle?: string,
  dueDate?: string,
  customerNames?: any,
  ticketId?: string,
  companyId?: string
}) => {
  const page = data.pageNo;
  const pagesize = data.pageSize;
  delete data.pageNo;
  delete data.pageSize;
  const requestLink = `/getOpenServiceTickets?page=${page}&pagesize=${pagesize}`
  return new Promise((resolve, reject) => {
    request(requestLink, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
