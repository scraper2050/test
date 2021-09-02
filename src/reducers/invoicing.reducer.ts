import {
  InvoiceActionType,
  InvoicingEstimatesActionType,
  InvoicingListActionType,
  InvoicingPurchaseOrdersActionType,
  InvoicingState,
  InvoicingTodosActionType
} from './../actions/invoicing/invoicing.types';
import { Reducer } from 'redux';
import { loadInvoiceDetail } from 'actions/invoicing/invoicing.action';

const initialState: InvoicingState = {
  'loading': false,
  'data': []
};

export const InvoicingTodoReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case InvoicingTodosActionType.GET:
      return {
        'loading': true,
        'data': initialState
      };
    case InvoicingTodosActionType.SET:
      return {
        'loading': false,
        'data': [...action.payload]
      };
    case InvoicingTodosActionType.FAILED:
      return {
        ...state,
        'loading': false,
        'error': action.payload
      };
  }
  return state;
};

export const InvoicingListReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case InvoicingListActionType.GET:
      return {
        'loading': true,
        'data': initialState
      };
    case InvoicingListActionType.SET:
      return {
        'loading': false,
        'data': [...action.payload]
      };
    case InvoicingListActionType.FAILED:
      return {
        ...state,
        'loading': false,
        'error': action.payload
      };
    case InvoiceActionType.UPDATE_EMAIL_HISTORY:
      return {
        ...state,
        'data': state.data.map((invoice:any) => {
          if (invoice._id === action.payload.id) {
            return {
              ...invoice,
              'lastEmailSent': Date.now()
            };
          }
          return invoice;
        })
      };
  }
  return state;
};

export const InvoicingPurchaseOrderReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case InvoicingPurchaseOrdersActionType.GET:
      return {
        'loading': true,
        'data': initialState
      };
    case InvoicingPurchaseOrdersActionType.SET:
      return {
        'loading': false,
        'data': [...action.payload]
      };
    case InvoicingPurchaseOrdersActionType.FAILED:
      return {
        ...state,
        'loading': false,
        'error': action.payload
      };
  }
  return state;
};

export const InvoicingEstimatesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case InvoicingEstimatesActionType.GET:
      return {
        'loading': true,
        'data': initialState
      };
    case InvoicingEstimatesActionType.SET:
      return {
        'loading': false,
        'data': [...action.payload]
      };
    case InvoicingEstimatesActionType.FAILED:
      return {
        ...state,
        'loading': false,
        'error': action.payload
      };
  }
  return state;
};


export const InvoiceDetailReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case loadInvoiceDetail.fetch.toString():
      return {
        'loading': true,
        'data': initialState
      };
    case loadInvoiceDetail.success.toString():
      return {
        'loading': false,
        'data': action.payload
      };
    case loadInvoiceDetail.fault.toString():
      return {
        ...state,
        'loading': false,
        'error': action.payload
      };
    case loadInvoiceDetail.cancelled.toString():
      return {
        ...state,
        'loading': false
      };
    case InvoiceActionType.UPDATE_EMAIL_HISTORY:
      return {
        ...state,
        'data': {
          ...state.data,
          'emailHistory':
            state.data.emailHistory
              ? [
                ...state.data.emailHistory,
                {
                  'sentAt': Date.now(),
                  'sentTo': action.payload.email
                }
              ]
              : [
                {
                  'sentAt': Date.now(),
                  'sentTo': action.payload.email
                }
              ]
        }
      };
    default: return state;
  }
};


