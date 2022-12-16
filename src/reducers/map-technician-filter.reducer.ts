import {
  MapTechnicianFilterState,
  MapTechnicianFilterActionType,
} from 'actions/map-technician-filter/map-technician-filter.types';
import { Reducer } from 'redux';

export const initialMapTechnicianFilterState: MapTechnicianFilterState = {
  selectedTechnician: [],
  jobDate: null,
};

export const MapTechnicianFilterReducer: Reducer<any> = (state = initialMapTechnicianFilterState, action) => {
  switch (action.type) {
    case MapTechnicianFilterActionType.RESET:
      return {
        ...initialMapTechnicianFilterState
      };
    case MapTechnicianFilterActionType.APPLY:
      return {
        ...action.payload
      };
  }
  return state;
};


