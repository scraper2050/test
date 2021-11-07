import {types} from "./map.types";

export const setTodaySelected = (job: any) => {
  return {
    'payload': job,
    'type': types.TODAY_SELECTED,
  };
};

export const setJobSelected = (job: any) => {
  return {
    'payload': job,
    'type': types.JOB_SELECTED,
  };
};

export const setTicketSelected = (ticket: any) => {
  return {
    'payload': ticket,
    'type': types.TICKET_SELECTED,
  };
};
