import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/job-type/job-type.types';

const initialJobTypes = {
  'data': [],
  'isLoading': false,
  'refresh': true
};

export default (state = initialJobTypes, { payload, type }: ReducerParamsInterface) => {
  switch (type) {
    case types.SET_JOB_TYPES:
      return {
        ...state,
        'data': [...payload]
      };
    case types.SET_JOB_TYPES_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_REFRESH_JOB_TYPES_STATUS:
      return {
        ...state,
        'refresh': payload
      };
    default:
      return state;
  }
};

