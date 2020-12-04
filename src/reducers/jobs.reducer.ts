// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/job/job.types';

const initialJob = {
  'data': [],
  'isLoading': false,
  'refresh': true
};

export default (state = initialJob, { payload, type }: ReducerParamsInterface) => {
  switch (type) {
    case types.SET_JOB:
      return {
        ...state,
        'data': [...payload]
      };
    case types.SET_JOB_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_REFRESH_JOB_STATUS:
      return {
        ...state,
        'refresh': payload
      };
    default:
      return state;
  }
};

