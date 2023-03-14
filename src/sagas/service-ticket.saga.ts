import { getServiceTicketDetail } from 'api/service-tickets.api';
import { setOpenServiceTicketObject, setServiceTicketLoading } from 'actions/service-ticket/service-ticket.action';
import { types } from 'actions/service-ticket/service-ticket.types';
import {
  call,
  cancelled,
  fork,
  put,
  take
} from 'redux-saga/effects';


export function *handleGetTicketDetail(action: { payload: any }) {
  try {
    const result = yield call(getServiceTicketDetail, action.payload);
    const { serviceTicket } = result;

    yield put(setOpenServiceTicketObject(serviceTicket));
  } catch (error) {
    yield put(setServiceTicketLoading(false));
  } finally {
    if (yield cancelled()) {
      yield put(setServiceTicketLoading(false));
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
