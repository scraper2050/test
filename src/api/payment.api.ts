import request from '../utils/http.service';
import { refreshPaymentTerms, setPaymentTerms, setPaymentTermsLoading } from 'actions/payment-terms/payment.terms.action';
import {
  getInvoicingList,
} from 'actions/invoicing/invoicing.action';

export const recordPayment: any = (params = {}) => {
  console.log({params});
  return (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const response: any = await request('/recordPayment', 'POST', params, false)
        .then((res: any) => {
          dispatch(getInvoicingList());
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};

