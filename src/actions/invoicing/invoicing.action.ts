import {
  getInvoicingEstimates as fetchInvoicingEstimates,
  getInvoicingList as fetchInvoicingList,
  getPurchaseOrder as fetchPurchaseOrder,
  getTodos as fetchTodos
} from 'api/invoicing.api';
import {
  InvoiceActionType,
  InvoicingEstimatesActionType,
  InvoicingListActionType,
  InvoicingPurchaseOrdersActionType,
  InvoicingTodosActionType
} from '../../actions/invoicing/invoicing.types';
import { createApiAction } from 'actions/action.utils';


export const loadingTodos = () => {
  return {
    'type': InvoicingTodosActionType.GET
  };
};

export const getTodos = () => {
  return async (dispatch: any) => {
    const todos: any = await fetchTodos();
    dispatch(setTodos(todos));
  };
};

export const setTodos = (managers: any) => {
  return {
    'type': InvoicingTodosActionType.SET,
    'payload': managers
  };
};

export const loadingInvoicingList = () => {
  return {
    'type': InvoicingListActionType.GET
  };
};

export const getInvoicingList = () => {
  return async (dispatch: any) => {
    const invoicingList: any = await fetchInvoicingList();
    dispatch(setInvoicingList(invoicingList));
  };
};

export const setInvoicingList = (invoicingList: any) => {
  return {
    'type': InvoicingListActionType.SET,
    'payload': invoicingList
  };
};

export const loadingPurchaseOrder = () => {
  return {
    'type': InvoicingPurchaseOrdersActionType.GET
  };
};

export const getPurchaseOrder = () => {
  return async (dispatch: any) => {
    const purchaseOrder: any = await fetchPurchaseOrder();
    dispatch(setPurchaseOrder(purchaseOrder));
  };
};

export const setPurchaseOrder = (purchaseOrder: any) => {
  return {
    'type': InvoicingPurchaseOrdersActionType.SET,
    'payload': purchaseOrder
  };
};

export const loadingInvoicingEstimates = () => {
  return {
    'type': InvoicingEstimatesActionType.GET
  };
};

export const getInvoicingEstimates = () => {
  return async (dispatch: any) => {
    const invoicingEstimates: any = await fetchInvoicingEstimates();
    dispatch(setInvoicingEstimates(invoicingEstimates));
  };
};

export const setInvoicingEstimates = (managers: any) => {
  return {
    'type': InvoicingEstimatesActionType.SET,
    'payload': managers
  };
};

export const updateInvoiceEmailHistory = (payload:any) => {
  return {
    payload,
    'type': InvoiceActionType.UPDATE_EMAIL_HISTORY
  };
};


export const loadInvoiceDetail = createApiAction(InvoiceActionType.LOAD_INVOICE_DETAIL);

