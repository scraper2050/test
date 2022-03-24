import { Reducer } from 'redux';
import {CalendarState, types} from "../actions/calendar/bc-calendar.types";

const initialCalendar: CalendarState = {
  selectedEvent: null,
  popperOpen: false,
  anchor: null,
  data: null,
};

export const CalendarReducer: Reducer<any> = (state = initialCalendar, {type, payload}) => {
  switch (type) {
    case (types.SET_SELECTED_EVENT):
      return {
        ...state,
        ...payload,
        popperOpen: true,
      };
    case (types.CLEAR_SELECTED_EVENT):
      return {
        ...state,
        selectedEvent: null,
        anchor: null,
        data: null,
        popperOpen: false,
      };
    case (types.OPEN_POPPER):
      return {
        ...state,
        popperOpen: true,
      };
    case (types.CLOSE_POPPER):
      return {
        ...state,
        popperOpen: false,
      };
    default:
      return state;
  }
};

