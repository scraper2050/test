
import { InvoiceLogsState, Logs, logType } from './logs.types';
import { Reducer } from 'redux';
import { loadInvoiceLogs } from 'actions/invoicing/logs/logs.action';

export type { InvoiceLogsState };

const initialState: InvoiceLogsState = {
  'error': '',
  'LogsObj': {
    'invoiceId': '',
    'invoice': [],
    'oldInvoiceId': '',
    'company': {},
    'companyLocation': {},
    'workType': {},
    'customer': {},
    'createdBy': '',
    'type': ''
  },
  'logs': [],
  'loading': false,
  'loadingObj': false
};


export const InvoiceLogsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case loadInvoiceLogs.fetch.toString():
      return {
        ...state,
        'loading': true,
        'data': initialState

      };
    case loadInvoiceLogs.success.toString():
      return {
        ...state,
        'logs': action.payload,
        'loading': false
      };
    case loadInvoiceLogs.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false
      };
    case loadInvoiceLogs.cancelled.toString():
      return {
        ...state,
        'loading': false
      };

    default:
      return state;
  }
};