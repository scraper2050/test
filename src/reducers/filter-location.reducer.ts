
import { types } from 'actions/filter-location/filter.location.types';
import { Reducer } from 'redux';

const initialSelectedLocation = {
  'data': {},
};

export const FilterLocationReducer: Reducer<any> = (state = initialSelectedLocation, action) => {
  switch (action.type) {
    case types.SET_CURRENT_LOCATION:
      return {
        ...state,
        'data': action.payload
      };
    default:
      return state;
  }
};
