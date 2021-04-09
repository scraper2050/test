import { Reducer } from 'redux';
import {
  JobReportActionType,
  JobReportState,
  JobReportsActionType,
  types
} from './job-report.types';

// I am to creat a job-report.reducer.ts in reducers/ folder for this:
const initialJobReport: JobReportState = {
  'loading': false,
  'jobReports': [],

  'JobReportObj': {
    '_id': '',
    'jobId': '',
    'status': 0,
    'employeeType': false,
    'dateTime': '',
    'description': '',
    'createdAt': '',
    'ticket': {
      'scheduleDateTime': '',
      'note': '',
      'ticketId': ''
    },
    'technician': {
      'auth': {
        'email': ''
      },
      'profile': {
        'displayName': ''
      },
      'contact': {
        'phone': ''
      },
      'permissions': {
        'role': ''
      }
    },
    'customer': {
      'auth': {
        'email': ''
      },
      'info': {
        'email': ''
      },
      'profile': {
        'displayName': ''
      },
      'contact': {
        'phone': ''
      },
      'address': {
        'street': '',
        'city': '',
        'state': '',
        'zipCode': ''
      }
    },
    'type': {
      'title': ''
    },
    'company': {
      'auth': {
        'email': ''
      },
      'info': {
        'companyName': '',
        'logoUrl': ''
      },
      'contact': {
        'phone': ''
      },
      'permissions': {
        'role': ''
      },
      'address': {
        'street': '',
        'city': '',
        'state': '',
        'zipCode': ''
      }
    },
    'createdBy': {
      'auth': {
        'email': ''
      },
      'info': {
        'companyName': ''
      },
      'profile': {
        'displayName': ''
      },
      'contact': {
        'phone': ''
      },
      'permissions': {
        'role': ''
      },
      'address': {
        'street': '',
        'city': '',
        'state': '',
        'zipCode': ''
      }
    },
    'scans': {
      'comment': '',
      'timeOfScan': '',
      'equipment': {
        'info': {
          'model': '',
          'serialNumber': '',
          'nfcTag': '',
          'location': ''
        },
        'images': [''],
        'type': {
          'title': ''
        },
        'brand': {
          'title': ''
        }
      }
    }
  }
};

export const JobReportReducer: Reducer<any> = (
  state = initialJobReport,
  action
) => {
  switch (action.type) {
    case JobReportsActionType.CANCELLED:
      return {
        ...state,
        'loading': false
      };
    case JobReportsActionType.SUCCESS:
      return {
        ...state,
        'jobReports': action.payload.reports,
        'loading': false
      };
    case JobReportsActionType.FAULT:
      return {
        ...state,
        'error': action.payload,
        'loading': false

      };
    case JobReportsActionType.FETCH:
      return {
        ...state,
        'loading': true
      };

    case JobReportActionType.CANCELLED:
      return {
        ...state,
        'loading': false
      };
    case JobReportActionType.SUCCESS:
      return {
        ...state,
        'jobReportObj': action.payload,
        'loading': false
      };
    case JobReportActionType.FAULT:
      return {
        ...state,
        'error': action.payload,
        'loading': false

      };
    case JobReportActionType.FETCH:
      return {
        ...state,
        'loading': true
      };
    default:
      return state;
  }
};
