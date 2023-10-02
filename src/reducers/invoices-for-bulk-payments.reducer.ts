import {
  InvoicesForBulkPaymentsState,
  InvoicesForBulkPaymentsListActionType,
} from '../actions/invoicing/invoices-for-bulk-payments/invoices-for-bulk-payments.types';
import { Reducer } from 'redux';

const initialState: InvoicesForBulkPaymentsState = {
  'loading': false,
  'data': [],
  prevCursor: '',
  nextCursor: '',
  total: 0,
  currentPageIndex: 0,
  currentPageSize: 15,
  keyword: '',
};

export const InvoicesForBulkPaymentsListReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS:
      return {
        ...state,
        data: action.payload,
      };
    case InvoicesForBulkPaymentsListActionType.SET_PREVIOUS_INVOICES_FOR_BULK_PAYMENTS_CURSOR:
      return {
        ...state,
        prevCursor: action.payload,
      };
    case InvoicesForBulkPaymentsListActionType.SET_NEXT_INVOICES_FOR_BULK_PAYMENTS_CURSOR:
      return {
        ...state,
        nextCursor: action.payload,
      };
    case InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case InvoicesForBulkPaymentsListActionType.SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_INDEX:
      return {
        ...state,
        currentPageIndex: action.payload,
      };
    case InvoicesForBulkPaymentsListActionType.SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_SIZE:
      return {
        ...state,
        currentPageSize: action.payload,
      };
    case InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
  }
  return state;
};
