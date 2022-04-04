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
  'data': [],
  loadingDraft: false,
  draft: [],
  prevCursor: '',
  nextCursor: '',
  total: 0,
  currentPageIndex: 0,
  currentPageSize: 10,
  keyword: '',
  prevCursorDraft: '',
  nextCursorDraft: '',
  totalDraft: 0,
  currentPageIndexDraft: 0,
  currentPageSizeDraft: 10,
  keywordDraft: '',
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
    case InvoicingListActionType.SET_INVOICES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case InvoicingListActionType.SET_INVOICES:
      return {
        ...state,
        data: action.payload,
      };
    case InvoicingListActionType.SET_PREVIOUS_INVOICES_CURSOR:
      return {
        ...state,
        prevCursor: action.payload,
      };
    case InvoicingListActionType.SET_NEXT_INVOICES_CURSOR:
      return {
        ...state,
        nextCursor: action.payload,
      };
    case InvoicingListActionType.SET_INVOICES_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case InvoicingListActionType.SET_CURRENT_INVOICES_PAGE_INDEX:
      return {
        ...state,
        currentPageIndex: action.payload,
      };
    case InvoicingListActionType.SET_CURRENT_INVOICES_PAGE_SIZE:
      return {
        ...state,
        currentPageSize: action.payload,
      };
    case InvoicingListActionType.SET_INVOICES_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    case InvoicingListActionType.SET_DRAFT_INVOICES_LOADING:
      return {
        ...state,
        loadingDraft: action.payload
      };
    case InvoicingListActionType.SET_DRAFT_INVOICES:
      return {
        ...state,
        draft: action.payload,
      };
    case InvoicingListActionType.SET_PREVIOUS_DRAFT_INVOICES_CURSOR:
      return {
        ...state,
        prevCursorDraft: action.payload,
      };
    case InvoicingListActionType.SET_NEXT_DRAFT_INVOICES_CURSOR:
      return {
        ...state,
        nextCursorDraft: action.payload,
      };
    case InvoicingListActionType.SET_DRAFT_INVOICES_TOTAL:
      return {
        ...state,
        totalDraft: action.payload,
      };
    case InvoicingListActionType.SET_CURRENT_DRAFT_INVOICES_PAGE_INDEX:
      return {
        ...state,
        currentPageIndexDraft: action.payload,
      };
    case InvoicingListActionType.SET_CURRENT_DRAFT_INVOICES_PAGE_SIZE:
      return {
        ...state,
        currentPageSizeDraft: action.payload,
      };
    case InvoicingListActionType.SET_DRAFT_INVOICES_SEARCH_KEYWORD:
      return {
        ...state,
        keywordDraft: action.payload,
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


