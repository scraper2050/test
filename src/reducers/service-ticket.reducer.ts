// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/service-ticket/service-ticket.types';

const initialServiceTicket = {
  'isLoading': false,
  'loadingObj': false,
  'refresh': true,
  'stream': true,
  'tickets': [],
  'openTickets': [],
  'openTicketObj': {},
  'totalOpenTickets': 0,
  'filterTicketState': {
    'jobTypeTitle': '',
    'dueDate': '',
    'customerNames': '',
    'ticketId': '',
    'contactName': ''
  },
  'notifications': [],
  'selectedCustomers': [],
  'ticket2Job': '',
  'prevCursor': '',
  'nextCursor': '',
  'total': 0,
  'currentPageIndex': 0,
  'currentPageSize': 15,
  'keyword': '',
  'filterIsHomeOccupied':false
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
    case types.SET_SERVICE_TICKET_STREAM:
      return {
        ...state,
        'stream': payload
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
      case types.SET_PREVIOUS_SERVICE_TICKET_CURSOR:
        return {
          ...state,
          prevCursor: payload,
        };
      case types.SET_NEXT_SERVICE_TICKET_CURSOR:
        return {
          ...state,
          nextCursor: payload,
        };
      case types.SET_SERVICE_TICKET_TOTAL:
        return {
          ...state,
          total: payload,
        };
      case types.SET_CURRENT_SERVICE_TICKET_PAGE_INDEX:
        return {
          ...state,
          currentPageIndex: payload,
        };
      case types.SET_CURRENT_SERVICE_TICKET_PAGE_SIZE:
        return {
          ...state,
          currentPageSize: payload,
        };
      case types.SET_SERVICE_TICKET_SEARCH_KEYWORD:
        return {
          ...state,
          keyword: payload,
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
        'loadingObj': false,
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
      };
    case types.SET_SERVICE_TICKET_NOTIFICATION:
      return {
        ...state,
        'notifications': [...payload]
      };

    case types.SET_SELECTED_CUSTOMERS:
      return {
        ...state,
        'selectedCustomers': payload
      };

    case types.GET_SERVICE_TICKET_DETAIL:
      return {
        ...state,
        'loadingObj': true
      };

    case types.SET_TICKET_2_JOB:
      return {
        ...state,
        'ticket2Job': payload
      };
    case types.IS_HOME_OCCUPIED:
      return {
        ...state,
        'filterIsHomeOccupied': payload
      };
    default:
      return state;
  }
};

