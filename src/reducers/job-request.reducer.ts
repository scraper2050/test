// Import { Reducer } from 'redux';
import { Reducer } from "redux";
import { JobRequestState, types } from "../actions/job-request/job-request.types";

const initialJobRequests: JobRequestState = {
  jobRequests: [],
  isLoading: false,
  refresh: true,
  prevCursor: '',
  nextCursor: '',
  lastPageCursor: '',
  total: 0,
  currentPageIndex: 0,
  currentPageSize: 15,
  keyword: '',
  numberOfJobRequest: 0,
};

export const jobRequestsReducer: Reducer<any> = (
  state = initialJobRequests,
  { payload, type }
) => {
  switch (type) {
    case types.SET_JOB_REQUESTS:
      return {
        ...state,
        'isLoading': false,
        jobRequests: [...payload],
      };
    case types.SET_PREVIOUS_JOB_REQUESTS_CURSOR:
      return {
        ...state,
        prevCursor: payload,
      };
    case types.SET_NEXT_JOB_REQUESTS_CURSOR:
      return {
        ...state,
        nextCursor: payload,
      };
    case types.SET_LAST_PAGE_JOB_REQUESTS_CURSOR:
      return {
        ...state,
        lastPageCursor: payload,
      };
    case types.SET_JOB_REQUESTS_TOTAL:
      return {
        ...state,
        total: payload,
      };
    case types.SET_CURRENT_JOB_REQUESTS_PAGE_INDEX:
      return {
        ...state,
        currentPageIndex: payload,
      };
    case types.SET_CURRENT_JOB_REQUESTS_PAGE_SIZE:
      return {
        ...state,
        currentPageSize: payload,
      };
    case types.SET_JOB_REQUESTS_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: payload,
      };
    case types.SET_NUMBER_OF_OPEN_JOB_REQUEST:
      return {
        ...state,
        numberOfJobRequest: payload,
      };
    case types.SET_JOB_REQUEST_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_REFRESH_JOB_REQUEST_STATUS:
      return {
        ...state,
        refresh: payload,
      };
    default:
      return state;
  }
};
