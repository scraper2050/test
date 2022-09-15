export interface PaymentsState {
  readonly loading: boolean;
  readonly data?: any;
  unSyncPaymentsCount: number;
  // readonly error?: string
  // prevCursor: string;
  // nextCursor: string;
  // total: number;
  // currentPageIndex: number;
  // currentPageSize: number;
  // keyword: string;
}

export enum PaymentsListActionType {
  SET_PAYMENTS_LOADING = 'SET_PAYMENTS_LOADING',
  SET_PAYMENTS = 'SET_PAYMENTS',
  UPDATE_SYNCED_PAYMENTS = 'UPDATE_SYNCED_PAYMENTS',
  // SET_PREVIOUS_PAYMENTS_CURSOR = 'SET_PREVIOUS_PAYMENTS_CURSOR',
  // SET_NEXT_PAYMENTS_CURSOR = 'SET_NEXT_PAYMENTS_CURSOR',
  // SET_PAYMENTS_TOTAL = 'SET_PAYMENTS_TOTAL',
  // SET_CURRENT_PAYMENTS_PAGE_INDEX = 'SET_CURRENT_PAYMENTS_PAGE_INDEX',
  // SET_CURRENT_PAYMENTS_PAGE_SIZE = 'SET_CURRENT_PAYMENTS_PAGE_SIZE',
  // SET_PAYMENTS_SEARCH_KEYWORD = 'SET_PAYMENTS_SEARCH_KEYWORD',
}
