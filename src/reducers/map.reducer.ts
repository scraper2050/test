import {Reducer} from "redux";
import {types} from "../actions/map/map.types";

export const initialState = {
  todaySelected: {_id: ''},
  ticketSelected: {_id: ''},
  jobSelected: {_id: ''},
}

export interface mapState {
  todaySelected: any;
  ticketSelected: any;
  jobSelected: any;
}

export const mapReducer: Reducer<any> = (
  state = initialState,
  { payload, type }
) => {
  switch (type) {
    case types.JOB_SELECTED:
      return {
        ...state,
        jobSelected: payload,
      };
    case types.TODAY_SELECTED:
      return {
        ...state,
        todaySelected: payload,
      };
    case types.TICKET_SELECTED:
      return {
        ...state,
        ticketSelected: payload,
      };
    default:
      return state;
  }
};
