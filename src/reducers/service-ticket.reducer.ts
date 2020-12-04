// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/service-ticket/service-ticket.types';

const initialServiceTicket = {
  'isLoading': false,
  'refresh': true,
  'tickets': []
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
    default:
      return state;
  }
};

