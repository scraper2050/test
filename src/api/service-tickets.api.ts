import request from '../utils/http.service';
import { refreshServiceTickets, setServiceTicket, setServiceTicketLoading, setOpenServiceTicketLoading, setOpenServiceTicket } from 'actions/service-ticket/service-ticket.action';


export const getAllServiceTicketAPI = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setServiceTicketLoading(true));
      request(`/getServiceTickets`, 'post', null)
        .then((res: any) => {
          let tempJobs = res.data.serviceTickets?.filter((ticket: any) => ticket.status !== 1);

          dispatch(setServiceTicket(tempJobs.reverse()));
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

    let formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })
    request(`/createServiceTicket`, 'post', formData, false)
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

    let formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })
    request(`/updateServiceTicket`, 'post', formData)
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

export const callEditServiceTicket = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/editServiceTicket`, 'post', data, false)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
