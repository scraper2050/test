// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from "reducers";
import { Reducer } from "redux";
import { JobActionType, JobsState, types } from "../actions/job/job.types";

const initialJob: JobsState = {
  data: [],
  isLoading: false,
  refresh: true,

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
  },
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
    case types.SET_REFRESH_JOB_STATUS:
      return {
        ...state,
        refresh: payload,
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
