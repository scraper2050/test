import request from '../utils/http.service';
import { refreshPaymentTerms, setPaymentTerms, setPaymentTermsLoading } from 'actions/payment-terms/payment.terms.action';
// import {
//   getInvoicingList,
// } from 'actions/invoicing/invoicing.action';
import { getAllInvoicesAPI } from './invoicing.api';

export const recordPayment: any = (params = {}) => {
  return (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const response: any = await request('/recordPayment', 'POST', params, false)
        .then((res: any) => {
          // dispatch(getInvoicingList());
          dispatch(getAllInvoicesAPI());
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};

export const updatePayment: any = (params = {}) => {
  return (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const response: any = await request('/updatePayment', 'PUT', params, false)
        .then((res: any) => {
          // dispatch(getInvoicingList());
          dispatch(getAllInvoicesAPI());
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};

