import { types } from './bc-calendar.types';

export const setSelectedEvent = (payload: any) => {
  return {
    payload,
    type: types.SET_SELECTED_EVENT,
  };
};

export const clearSelectedEvent = () => {
  return {
    'type': types.CLEAR_SELECTED_EVENT,
  };
};
