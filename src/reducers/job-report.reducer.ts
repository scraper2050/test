import { Reducer } from "redux";
import {
  JobReportState,
  JobReportActionType,
  types,
} from "./../actions/customer/job-report/job-report.types";

// I am to creat a job-report.reducer.ts in reducers/ folder for this:
const initialJobReport: JobReportState = {
  loading: false,
  data: [],

  JobReportObj: {
    _id: "",
    jobId: "",
    status: 0,
    employeeType: false,
    dateTime: "",
    description: "",
    createdAt: "",
    ticket: {
      scheduleDateTime: "",
      note: "",
      ticketId: "",
    },
    technician: {
      auth: {
        email: "",
      },
      profile: {
        displayName: "",
      },
      contact: {
        phone: "",
      },
      permissions: {
        role: "",
      },
    },
    customer: {
      auth: {
        email: "",
      },
      info: {
        email: "",
      },
      profile: {
        displayName: "",
      },
      contact: {
        phone: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    type: {
      title: "",
    },
    company: {
      auth: {
        email: "",
      },
      info: {
        companyName: "",
        logoUrl: "",
      },
      contact: {
        phone: "",
      },
      permissions: {
        role: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    createdBy: {
      auth: {
        email: "",
      },
      info: {
        companyName: "",
      },
      profile: {
        displayName: "",
      },
      contact: {
        phone: "",
      },
      permissions: {
        role: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    scans: {
      comment: "",
      timeOfScan: "",
      equipment: {
        info: {
          model: "",
          serialNumber: "",
          nfcTag: "",
          location: "",
        },
        images: [""],
        type: {
          title: "",
        },
        brand: {
          title: "",
        },
      },
    },
  },
};

export const JobReportReducer: Reducer<any> = (
  state = initialJobReport,
  action
) => {
  switch (action.type) {
    case JobReportActionType.GET:
      return {
        ...state,
        loading: true,
        data: initialJobReport,
      };
    case JobReportActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...action.payload],
      };
    case types.SET_JOBREPORTS:
      return {
        ...state,
        loading: false,
        data: [...action.payload],
      };
    case JobReportActionType.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SET_SINGLE_JOBREPORT:
      return {
        ...state,
        loading: false,
        JobReportObj: action.payload,
      };
    case types.GET_SINGLE_JOBREPORT:
      return {
        ...state,
        loading: true,
      };
  }
  return state;
};
