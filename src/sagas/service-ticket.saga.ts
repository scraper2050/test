import { getServiceTicketDetail } from 'api/service-tickets.api';
import {
  call,
  cancelled,
  fork,
  put,
  take,
  takeLatest
} from 'redux-saga/effects';

import { setOpenServiceTicketObject } from 'actions/service-ticket/service-ticket.action';
import { types } from 'actions/service-ticket/service-ticket.types';
import { loadCustomersActions } from 'actions/customer/customer.action';
import { getJobLocation } from 'api/job-location.api';
import { getJobSite } from 'api/job-site.api';
import { getContactsApi } from 'api/contacts.api';
import { getAllJobTypes } from 'api/job.api';


export function *handleGetTicketDetail(action: { payload: any }) {
  try {
    const result = yield call(getServiceTicketDetail, action.payload);
    const { serviceTicket } = result;
    let detail = { ...serviceTicket };

    if (serviceTicket.jobLocation) {
      const location = yield call(getJobLocation, serviceTicket.jobLocation);
      detail = {
        ...detail,
        'jobLocation': location[0].name
      };
    }

    if (serviceTicket.jobSite) {
      const jobSite = yield call(getJobSite, serviceTicket.jobSite);
      detail = {
        ...detail,
        'jobSite': jobSite[0].name
      };
    }

    if (serviceTicket.customerContactId) {
      const data = {
        'referenceNumber': serviceTicket.customer._id,
        'type': 'Customer'

      };
      const contacts = yield call(getContactsApi, data);
      const contact = contacts.find((contact:any) => contact._id === serviceTicket.customerContactId);
      detail = {
        ...detail,
        'contactName': contact.name
      };
    }

    if (serviceTicket.jobType) {
      const jobTypes = yield call(getAllJobTypes);
      const job = jobTypes.find((type:any) => type._id === serviceTicket.jobType);
      detail = {
        ...detail,
        'jobType': job.title
      };
    }

    yield put(setOpenServiceTicketObject(detail));
  } catch (error) {
    yield console.log(error);
  } finally {
    if (yield cancelled()) {
      yield console.log('cancelled');
    }
  }
}

export default function *watchLoadServiceTicket() {
  while (true) {
    const fetchAction = yield take(types.GET_SERVICE_TICKET_DETAIL);
    // Const task = yield fork(handleGetCustomers, fetchAction);
    yield fork(
      handleGetTicketDetail,
      fetchAction
    );
  }
}
