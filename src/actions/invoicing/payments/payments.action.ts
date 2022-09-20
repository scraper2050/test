import {
  PaymentsListActionType,
} from './payments.types';

export const setPaymentsLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': PaymentsListActionType.SET_PAYMENTS_LOADING
  };
};
export const setPayments = (payments: any, unSyncCount: number = 0) => {
  return {
    'payload': {
      payments,
      unSyncCount,
    },
    'type': PaymentsListActionType.SET_PAYMENTS
  };
};
export const updateSyncedPayments = (payments: any[]) => {
  return {
    'payload': payments,
    'type': PaymentsListActionType.UPDATE_SYNCED_PAYMENTS
  };
};
// export const setPreviousPaymentsCursor = (prevCursor: string) => {
//   return {
//     'payload': prevCursor,
//     'type': PaymentsListActionType.SET_PREVIOUS_PAYMENTS_CURSOR
//   };
// };
// export const setNextPaymentsCursor = (nextCursor: string) => {
//   return {
//     'payload': nextCursor,
//     'type': PaymentsListActionType.SET_NEXT_PAYMENTS_CURSOR
//   };
// };
// export const setPaymentsTotal = (total: number) => {
//   return {
//     'payload': total,
//     'type': PaymentsListActionType.SET_PAYMENTS_TOTAL
//   };
// };
// export const setCurrentPageIndex = (currentPageIndex: number) => {
//   return {
//     'payload': currentPageIndex,
//     'type': PaymentsListActionType.SET_CURRENT_PAYMENTS_PAGE_INDEX
//   };
// };
// export const setCurrentPageSize = (currentPageSize: number) => {
//   return {
//     'payload': currentPageSize,
//     'type': PaymentsListActionType.SET_CURRENT_PAYMENTS_PAGE_SIZE
//   };
// };
// export const setKeyword = (keyword: string) => {
//   return {
//     'payload': keyword,
//     'type': PaymentsListActionType.SET_PAYMENTS_SEARCH_KEYWORD
//   };
// };
