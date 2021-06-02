import { Reducer } from 'redux';
import {
  JobReportState
} from './job-report.types';
import { loadJobReportActions, loadJobReportsActions } from 'actions/customer/job-report/job-report.action';
import { types } from 'reducers/job-report.types';

// I am to creat a job-report.reducer.ts in reducers/ folder for this:
const initialJobReport: JobReportState = {
  'loading': false,
  'jobReports': [],

  'jobReportObj': {
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
    },
    'emailHistory': []
  }
};

export const JobReportReducer: Reducer<any> = (
  state = initialJobReport,
  action
) => {
  switch (action.type) {
    case loadJobReportsActions.cancelled.toString():
      return {
        ...state,
        'loading': false
      };
    case loadJobReportsActions.success.toString():
      return {
        ...state,
        'jobReports': action.payload.reports.reverse(),
        'loading': false
      };
    case loadJobReportsActions.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false

      };
    case loadJobReportsActions.fetch.toString():
      return {
        ...state,
        'loading': true
      };

    case loadJobReportActions.cancelled.toString():
      return {
        ...state,
        'loading': false
      };
    case loadJobReportActions.success.toString():
      return {
        ...state,
        'jobReportObj': action.payload,
        'loading': false
      };
    case loadJobReportActions.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false

      };
    case loadJobReportActions.fetch.toString():
      return {
        ...state,
        'loading': true
      };

    case types.UPDATE_EMAIL_HISTORY:
      return {
        ...state,
        'jobReports': state.jobReports.map((jobReport:any) => {
          if (jobReport._id === action.payload.id) {
            return {
              ...jobReport,
              'emailHistory': [
                ...jobReport.emailHistory,
                {
                  'sentAt': Date.now()
                }
              ]
            };
          }
          return jobReport;
        }),
        'jobReportObj': {
          ...state.jobReportObj,
          'emailHistory': action.payload.email
            ? [
              ...state.jobReportObj.emailHistory,
              {
                'sentAt': Date.now(),
                'sentTo': action.payload.email
              }
            ]
            : state.jobReportObj.emailHistory
        }
      };


    default:
      return state;
  }
};
