// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/service-ticket/service-ticket.types';

const initialServiceTicket = {
  'isLoading': false,
  'refresh': true,
  'tickets': [],
  'openTickets': [],
  'openTicketObj': {},
  'totalOpenTickets': 0,
  'filterTicketState': {
    'jobTypeTitle': '',
    'dueDate': '',
    'customerNames': '',
    'ticketId': '',
    'contactName': '',
  }
};

export default (state = initialServiceTicket, { payload, type }: ReducerParamsInterface) => {
  switch (type) {
    case types.SET_SERVICE_TICKET:
      return {
        ...state,
        'tickets': [...payload]
      };
    case types.SET_SERVICE_TICKET_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_REFRESH_SERVICE_TICKET_STATUS:
      return {
        ...state,
        'refresh': payload
      };
    case types.SET_OPEN_SERVICE_TICKET_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_OPEN_SERVICE_TICKET:
      return {
        ...state,
        'openTickets': [...payload.serviceTickets],
        'totalOpenTickets': payload.total
      };
    case types.SET_OPEN_SERVICE_TICKET_OBJECT:
      return {
        ...state,
        'openTicketObj': payload
      };
    case types.SET_CLEAR_OPEN_SERVICE_TICKET_OBJECT:
      return {
        ...state,
        'openTicketObj': {}
      };
    case types.SET_OPEN_TICKET_FILTER_STATE:
      return {
        ...state,
        'filterTicketState': payload
      };
    case types.SET_CLEAR_TICKET_FILTER_STATE:
      return {
        ...state,
        'filterTicketState': payload
      }
    default:
      return state;
  }
};

