import { InvoicesForBulkPaymentsListActionType } from './invoices-for-bulk-payments.types';

export const setInvoicesLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS_LOADING
  };
};

export const setInvoices = (invoices: any) => {
  return {
    'payload': invoices,
    'type': InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS
  };
};
export const setPreviousInvoicesCursor = (prevCursor: string) => {
  return {
    'payload': prevCursor,
    'type': InvoicesForBulkPaymentsListActionType.SET_PREVIOUS_INVOICES_FOR_BULK_PAYMENTS_CURSOR
  };
};
export const setNextInvoicesCursor = (nextCursor: string) => {
  return {
    'payload': nextCursor,
    'type': InvoicesForBulkPaymentsListActionType.SET_NEXT_INVOICES_FOR_BULK_PAYMENTS_CURSOR
  };
};
export const setInvoicesTotal = (total: number) => {
  return {
    'payload': total,
    'type': InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS_TOTAL
  };
};
export const setCurrentPageIndex = (currentPageIndex: number) => {
  return {
    'payload': currentPageIndex,
    'type': InvoicesForBulkPaymentsListActionType.SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_INDEX
  };
};
export const setCurrentPageSize = (currentPageSize: number) => {
  return {
    'payload': currentPageSize,
    'type': InvoicesForBulkPaymentsListActionType.SET_CURRENT_INVOICES_FOR_BULK_PAYMENTS_PAGE_SIZE
  };
};
export const setKeyword = (keyword: string) => {
  return {
    'payload': keyword,
    'type': InvoicesForBulkPaymentsListActionType.SET_INVOICES_FOR_BULK_PAYMENTS_SEARCH_KEYWORD
  };
};