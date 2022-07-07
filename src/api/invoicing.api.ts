import axios from 'axios';
import moment from 'moment';
import request from 'utils/http.service';
import {
  setInvoicesLoading,
  setInvoices,
  setInvoicesTotal,
  setNextInvoicesCursor,
  setPreviousInvoicesCursor,
  setDraftInvoicesLoading,
  setDraftInvoices,
  setDraftInvoicesTotal,
  setNextDraftInvoicesCursor,
  setPreviousDraftInvoicesCursor
} from 'actions/invoicing/invoicing.action';
import {
  setInvoicesLoading as setInvoicesForBulkPaymentsLoading,
  setInvoices as setInvoicesForBulkPayments,
  setInvoicesTotal as setInvoicesForBulkPaymentsTotal,
  setNextInvoicesCursor as setNextInvoicesForBulkPaymentsCursor,
  setPreviousInvoicesCursor as setPreviousInvoicesForBulkPaymentsCursor,
} from 'actions/invoicing/invoices-for-bulk-payments/invoices-for-bulk-payments.action';

export const getTodos = async (params = {}) => {
  let responseData;
  try {
    const response: any = await request('/getJobs', 'POST', params, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData.jobs;
};

let cancelTokenGetAllInvoicesForBulkPaymentsAPI:any;
export const getAllInvoicesForBulkPaymentsAPI = (pageSize = 10, previousCursor = '', nextCursor = '', keyword?: string, selectionRange?:{startDate:Date;endDate:Date}|null, customerId?: string, dueDate?: Date|null, showPaid?: boolean) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setInvoicesForBulkPaymentsLoading(true));
      const optionObj:any = {
        pageSize,
        previousCursor,
        nextCursor,
        isDraft: false,
      };
      if(keyword){
        optionObj.keyword = keyword
      }
      if(selectionRange){
        optionObj.startDate = moment(selectionRange.startDate).format('YYYY-MM-DD');
        optionObj.endDate = moment(selectionRange.endDate).add(1,'day').format('YYYY-MM-DD');
      }
      if(customerId){
        optionObj.customerId = customerId;
      }
      if(dueDate){
        optionObj.dueDate = moment(dueDate).format('YYYY-MM-DD');
      }
      if(showPaid === false) {
        optionObj.status = JSON.stringify(["UNPAID", "PARTIALLY_PAID"]);
      }
      if(cancelTokenGetAllInvoicesForBulkPaymentsAPI) {
        cancelTokenGetAllInvoicesForBulkPaymentsAPI.cancel('axios canceled');
        setTimeout(() => {
          dispatch(setInvoicesForBulkPaymentsLoading(true));
        }, 0);
      }

      cancelTokenGetAllInvoicesForBulkPaymentsAPI = axios.CancelToken.source();

      request(`/getInvoices`, 'post', optionObj, undefined, undefined, cancelTokenGetAllInvoicesForBulkPaymentsAPI)
        .then((res: any) => {
          let tempInvoices = res.data.invoices;
          dispatch(setInvoicesForBulkPayments(tempInvoices.reverse()));
          dispatch(setPreviousInvoicesForBulkPaymentsCursor(res.data?.pagination?.previousCursor ? res.data?.pagination?.previousCursor : ''));
          dispatch(setNextInvoicesForBulkPaymentsCursor(res.data?.pagination?.nextCursor ? res.data?.pagination?.nextCursor : ''));
          dispatch(setInvoicesForBulkPaymentsTotal(res.data?.total ? res.data?.total : 0));
          dispatch(setInvoicesForBulkPaymentsLoading(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setInvoicesForBulkPaymentsLoading(false));
          dispatch(setInvoicesForBulkPayments([]));
          if(err.message !== 'axios canceled'){
            return reject(err);
          }
        });
    });
  };
};

let cancelTokenGetAllInvoicesAPI:any;
export const getAllInvoicesAPI = (pageSize = 10, previousCursor = '', nextCursor = '', keyword?: string, selectionRange?:{startDate:Date;endDate:Date}|null, customerId?: string, dueDate?: Date|null, showPaid?: boolean) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setInvoicesLoading(true));
      const optionObj:any = {
        pageSize,
        previousCursor,
        nextCursor,
        isDraft: false,
      };
      if(keyword){
        optionObj.keyword = keyword
      }
      if(selectionRange){
        optionObj.startDate = moment(selectionRange.startDate).format('YYYY-MM-DD');
        optionObj.endDate = moment(selectionRange.endDate).add(1,'day').format('YYYY-MM-DD');
      }
      if(customerId){
        optionObj.customerId = customerId;
      }
      if(dueDate){
        optionObj.dueDate = moment(dueDate).format('YYYY-MM-DD');
      }
      if(showPaid === false) {
        optionObj.status = JSON.stringify(["UNPAID", "PARTIALLY_PAID"]);
      }
      if(cancelTokenGetAllInvoicesAPI) {
        cancelTokenGetAllInvoicesAPI.cancel('axios canceled');
        setTimeout(() => {
          dispatch(setInvoicesLoading(true));
        }, 0);
      }

      cancelTokenGetAllInvoicesAPI = axios.CancelToken.source();

      request(`/getInvoices`, 'post', optionObj, undefined, undefined, cancelTokenGetAllInvoicesAPI)
        .then((res: any) => {
          let tempInvoices = res.data.invoices;
          dispatch(setInvoices(tempInvoices.reverse()));
          dispatch(setPreviousInvoicesCursor(res.data?.pagination?.previousCursor ? res.data?.pagination?.previousCursor : ''));
          dispatch(setNextInvoicesCursor(res.data?.pagination?.nextCursor ? res.data?.pagination?.nextCursor : ''));
          dispatch(setInvoicesTotal(res.data?.total ? res.data?.total : 0));
          dispatch(setInvoicesLoading(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setInvoicesLoading(false));
          dispatch(setInvoices([]));
          if(err.message !== 'axios canceled'){
            return reject(err);
          }
        });
    });
  };
};

let cancelTokenGetAllDraftInvoicesAPI:any;
export const getAllDraftInvoicesAPI = (pageSize = 10, previousCursor = '', nextCursor = '', keyword?: string) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setDraftInvoicesLoading(true));
      const optionObj:any = {
        pageSize,
        previousCursor,
        nextCursor,
        isDraft: true,
      };
      if(keyword){
        optionObj.keyword = keyword
      }
      if(cancelTokenGetAllDraftInvoicesAPI) {
        cancelTokenGetAllDraftInvoicesAPI.cancel('axios canceled');
        setTimeout(() => {
          dispatch(setDraftInvoicesLoading(true));
        }, 0);
      }

      cancelTokenGetAllDraftInvoicesAPI = axios.CancelToken.source();

      request(`/getInvoices`, 'post', optionObj, undefined, undefined, cancelTokenGetAllInvoicesAPI)
        .then((res: any) => {
          let tempDraftInvoices = res.data.invoices;
          dispatch(setDraftInvoices(tempDraftInvoices.reverse()));
          dispatch(setPreviousDraftInvoicesCursor(res.data?.pagination?.previousCursor ? res.data?.pagination?.previousCursor : ''));
          dispatch(setNextDraftInvoicesCursor(res.data?.pagination?.nextCursor ? res.data?.pagination?.nextCursor : ''));
          dispatch(setDraftInvoicesTotal(res.data?.total ? res.data?.total : 0));
          dispatch(setDraftInvoicesLoading(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setDraftInvoicesLoading(false));
          dispatch(setDraftInvoices([]));
          if(err.message !== 'axios canceled'){
            return reject(err);
          }
        });
    });
  };
};

export const getInvoicingList = async (params = {}) => {
  let responseData;
  try {
    const response: any = await request('/getInvoices', 'POST', params, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData.invoices;
};

export const getPurchaseOrder = async (params = {}) => {
  let responseData;
  try {
    const response: any = await request('/getAllPurchaseOrder', 'POST', params, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData.purchaseOrders;
};

export const getInvoicingEstimates = async (params = {}) => {
  let responseData;
  try {
    const response: any = await request('/getEstimate', 'POST', params, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData.estimates;
};

export const getInvoiceDetail = async (invoiceId:string) => {
  try {
    const response: any = await request('/getInvoiceDetail', 'POST', { invoiceId }, false);
    return response.data;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

export const callCreateInvoiceAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/createInvoice`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const updateInvoice = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/updateInvoice`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const voidInvoice = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/voidInvoice`, 'delete', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const sendEmailInvoice = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/sendInvoice`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const callCreatePurchaseOrderAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/createPurchaseOrder`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const generateInvoicePdfAPI = (customerId: string, invoiceId: string) => {
  return new Promise((resolve, reject) => {
    request(`/generateInvoicePdf?customerId=${customerId}&invoiceId=${invoiceId}`, 'get')
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const callCreateEstimatesAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/createEstimate`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

