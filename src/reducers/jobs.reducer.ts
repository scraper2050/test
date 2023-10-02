// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from "reducers";
import { Reducer } from "redux";
import { JobActionType, JobsState, types } from "../actions/job/job.types";

const initialJob: JobsState = {
  data: [],
  jobsList: [],
  scheduledJobs: [],
  todaysJobs: [],
  isLoading: false,
  isTodaysJobLoading: false,
  refresh: true,
  streaming: false,

  jobObj: {
    _id: "",
    _v: "",
    charges: 0,
    scheduleDate: "",
    scheduledStartTime: "",
    scheduledEndTime: "",
    estimate: "",
    customer: {
      address: {
        city: "",
        state: "",
        zipCode: "",
      },
      contactName: "",
      info: {
        email: "",
      },
      profile: {
        displayName: "",
      },
      contact: {
        phone: "",
      },
      _t: "",
      _id: "",
    },
    description: "",
    employeeType: false,
    endTime: "",
    equipment_scanned: false,
    jobId: "",
    no_of_equipment_scanned: 0,
    type: {
      title: "",
      _id: "",
    },
    comment: "",
    status: "",
    company: {
      info: {
        companyName: "",
        companyEmail: "",
      },
      contact: {
        phone: "",
      },
      _id: "",
    },
    startTime: "",
    completeOnTime: false,
    createdAt: "",
    createdBy: {
      profile: {
        displayName: "",
      },
      _t: "",
      _id: "",
    },
    technician: {
      profile: {
        displayName: "",
      },
      __t: "",
      _id: "",
    },
    ticket: {
      note: "",
      ticketId: "",
      _id: "",
      jobLocation: "",
    },
    timeSpent: 0,
    tasks:[],
  },
  prevCursor: '',
  nextCursor: '',
  total: 0,
  currentPageIndex: 0,
  currentPageSize: 15,
  keyword: '',
};

export const jobReducer: Reducer<any> = (
  state = initialJob,
  { payload, type }
) => {
  switch (type) {
    case JobActionType.GET:
      return {
        ...state,
        isLoading: true,
        data: initialJob,
      };
    case JobActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [...payload],
      };
    case types.SET_JOBS:
      return {
        ...state,
        'isLoading': false,
        data: [...payload],
      };
    case types.SET_JOBS_LIST:
      return {
        ...state,
        'isLoading': false,
        jobsList: [...payload],
      };
    case types.SET_SCHEDULED_JOBS:
      return {
        ...state,
        'isLoading': false,
        scheduledJobs: [...payload],
      };
    case types.SET_TODAYS_JOBS:
      return {
        ...state,
        'isTodaysJobLoading': false,
        todaysJobs: [...payload],
      };
    case types.SET_PREVIOUS_JOBS_CURSOR:
      return {
        ...state,
        prevCursor: payload,
      };
    case types.SET_NEXT_JOBS_CURSOR:
      return {
        ...state,
        nextCursor: payload,
      };
    case types.SET_JOBS_TOTAL:
      return {
        ...state,
        total: payload,
      };
    case types.SET_CURRENT_JOBS_PAGE_INDEX:
      return {
        ...state,
        currentPageIndex: payload,
      };
    case types.SET_CURRENT_JOBS_PAGE_SIZE:
      return {
        ...state,
        currentPageSize: payload,
      };
    case types.SET_JOBS_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: payload,
      };
    case JobActionType.FAILED:
      return {
        ...state,
        isLoading: false,
        error: [...payload],
      };
    case types.SET_JOB_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_TODAYS_JOB_LOADING:
      return {
        ...state,
        'isTodaysJobLoading': payload
      };
    case types.SET_REFRESH_JOB_STATUS:
      return {
        ...state,
        refresh: payload,
      };
    case types.SET_STREAM_JOB_STATUS:
      return {
        ...state,
        streaming: payload,
      };
    case types.SET_SINGLE_JOB:
      return {
        ...state,
        isLoading: false,
        jobObj: payload,
      };
    case types.GET_SINGLE_JOB:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
