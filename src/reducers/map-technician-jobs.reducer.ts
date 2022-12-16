import {
  MapTechnicianJobsState,
  MapTechnicianJobsActionType,
} from 'actions/map-technician-jobs/map-technician-jobs.types';
import { Reducer } from 'redux';

export const initialMapTechnicianJobsState: MapTechnicianJobsState = {
  jobs: [],
};

export const MapTechnicianJobsReducer: Reducer<any> = (state = initialMapTechnicianJobsState, action) => {
  switch (action.type) {
    case MapTechnicianJobsActionType.SET_MAP_TECHNICIAN_JOBS:
      return {
        ...action.payload
      };
  }
  return state;
};


