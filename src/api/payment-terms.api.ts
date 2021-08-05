import request from '../utils/http.service';
import { refreshPaymentTerms, setPaymentTerms, setPaymentTermsLoading } from 'actions/payment-terms/payment.terms.action';

export const getAllPaymentTermsAPI: any = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setPaymentTermsLoading(true));
      request(`/getPaymentTerms`, 'get', null)
        .then((res: any) => {
          dispatch(setPaymentTerms(res.data.paymentTerms));
          dispatch(setPaymentTermsLoading(false));
          dispatch(refreshPaymentTerms(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setPaymentTermsLoading(false));
          return reject(err);
        });
    });
  };
};

export interface PaymentTermsProps {
  paymentTermId?: string;
}

export const updateDefaultPaymentTermAPI = async ({ paymentTermId }:PaymentTermsProps) => {
  let responseData;
  try {
    const response: any = await request(`/setCompanyDefaultPaymentTerm`, 'POST', { 'paymentTermId': paymentTermId}, false);
    responseData = response.data.companyPaymentTerm;
  } catch (err) {
    responseData = { 'msg': '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.msg = 'We are facing some issues, please try again.';
    } else {
      responseData.msg = 'Something went wrong';
    }
  }
  return responseData;
};


export interface UpdatePaymentTermsProps {
  paymentTermId: string;
  customerId: string;
}

export const updateCustomerDefaultPaymentTermAPI = async ({ paymentTermId, customerId }:UpdatePaymentTermsProps) => {
  let responseData;
  try {
    const response: any = await request(`/setCustomerPaymentTerm`, 'POST', { 'paymentTermId': paymentTermId, 'customerId': customerId}, false);
    responseData = { 'msg': '' };
    if (response.data.status === 0){
      responseData.msg = 'We are facing some issues, please try again.';
    } else {
      responseData = response.data;
    }
  } catch (err) {
    responseData = { 'msg': '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.msg = 'We are facing some issues, please try again.';
    } else {
      responseData.msg = 'Something went wrong';
    }
  }
  return responseData;
};

