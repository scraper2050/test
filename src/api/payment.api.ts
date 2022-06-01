import axios from 'axios';
import moment from 'moment';
import request from '../utils/http.service';
import { refreshPaymentTerms, setPaymentTerms, setPaymentTermsLoading } from 'actions/payment-terms/payment.terms.action';
// import {
//   getInvoicingList,
// } from 'actions/invoicing/invoicing.action';
import { getAllInvoicesAPI } from './invoicing.api';
import {
  setPaymentsLoading,
  setPayments,
  // setPaymentsTotal,
  // setNextPaymentsCursor,
  // setPreviousPaymentsCursor,
} from 'actions/invoicing/payments/payments.action';

export const recordPayment: any = (params = {}) => {
  return (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      const response: any = await request('/recordPayment', 'POST', params, false)
        .then((res: any) => {
          // dispatch(getInvoicingList());
          dispatch(getAllInvoicesAPI());
          dispatch(getAllPaymentsAPI());
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
          dispatch(getAllPaymentsAPI());
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};

let cancelTokenGetAllPaymentsAPI:any;
export const getAllPaymentsAPI = (pageSize = 10, previousCursor = '', nextCursor = '', keyword?: string, selectionRange?:{startDate:Date;endDate:Date}|null, customerId?: string, dueDate?: Date|null, showPaid?: boolean) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setPaymentsLoading(true));
      const optionObj = {};
      // const optionObj:any = {
      //   pageSize,
      //   previousCursor,
      //   nextCursor,
      //   isDraft: false,
      // };
      // if(keyword){
      //   optionObj.keyword = keyword
      // }
      // if(selectionRange){
      //   optionObj.startDate = moment(selectionRange.startDate).format('YYYY-MM-DD');
      //   optionObj.endDate = moment(selectionRange.endDate).add(1,'day').format('YYYY-MM-DD');
      // }
      // if(customerId){
      //   optionObj.customerId = customerId;
      // }
      // if(dueDate){
      //   optionObj.dueDate = moment(dueDate).format('YYYY-MM-DD');
      // }
      // if(showPaid === false) {
      //   optionObj.status = JSON.stringify(["UNPAID", "PARTIALLY_PAID"]);
      // }
      // if(cancelTokenGetAllPaymentsAPI) {
      //   cancelTokenGetAllPaymentsAPI.cancel('axios canceled');
      //   setTimeout(() => {
      //     dispatch(setPaymentsLoading(true));
      //   }, 0);
      // }
      
      cancelTokenGetAllPaymentsAPI = axios.CancelToken.source();

      request(`/getPayments`, 'GET', optionObj, undefined, undefined, cancelTokenGetAllPaymentsAPI)
        .then((res: any) => {
          let tempPayments = res.data.payment;
          dispatch(setPayments(tempPayments.reverse()));
          // dispatch(setPreviousPaymentsCursor(res.data?.pagination?.previousCursor ? res.data?.pagination?.previousCursor : ''));
          // dispatch(setNextPaymentsCursor(res.data?.pagination?.nextCursor ? res.data?.pagination?.nextCursor : ''));
          // dispatch(setPaymentsTotal(res.data?.total ? res.data?.total : 0));
          dispatch(setPaymentsLoading(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setPaymentsLoading(false));
          dispatch(setPayments([]));
          if(err.message !== 'axios canceled'){
            return reject(err);
          }
        });
    });
  };
};

