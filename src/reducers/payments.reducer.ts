import { PaymentsListActionType, PaymentsState } from 'actions/invoicing/payments/payments.types';
import { Reducer } from 'redux';

const initialState: PaymentsState = {
  'loading': false,
  'data': [],
  // prevCursor: '',
  // nextCursor: '',
  // total: 0,
  // currentPageIndex: 0,
  // currentPageSize: 10,
  // keyword: '',
};

export const PaymentsListReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case PaymentsListActionType.SET_PAYMENTS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case PaymentsListActionType.SET_PAYMENTS:
      return {
        ...state,
        data: action.payload,
      };
    // case PaymentsListActionType.SET_PREVIOUS_PAYMENTS_CURSOR:
    //   return {
    //     ...state,
    //     prevCursor: action.payload,
    //   };
    // case PaymentsListActionType.SET_NEXT_PAYMENTS_CURSOR:
    //   return {
    //     ...state,
    //     nextCursor: action.payload,
    //   };
    // case PaymentsListActionType.SET_PAYMENTS_TOTAL:
    //   return {
    //     ...state,
    //     total: action.payload,
    //   };
    // case PaymentsListActionType.SET_CURRENT_PAYMENTS_PAGE_INDEX:
    //   return {
    //     ...state,
    //     currentPageIndex: action.payload,
    //   };
    // case PaymentsListActionType.SET_CURRENT_PAYMENTS_PAGE_SIZE:
    //   return {
    //     ...state,
    //     currentPageSize: action.payload,
    //   };
    // case PaymentsListActionType.SET_PAYMENTS_SEARCH_KEYWORD:
    //   return {
    //     ...state,
    //     keyword: action.payload,
    //   };
  }
  return state;
};

