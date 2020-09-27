import { types } from './service-ticket.types';
export const setServiceTicket = (serviceTickets: any) => {
  return {
    'payload': serviceTickets,
    'type': types.SET_SERVICE_TICKET
  };
};
export const setServiceTicketLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_SERVICE_TICKET_LOADING
  };
};
export const refreshServiceTickets = (refresh: any) => {
  return {
    'payload': refresh,
    'type': types.SET_REFRESH_SERVICE_TICKET_STATUS
  };
};
