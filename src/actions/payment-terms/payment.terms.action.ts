import { types } from './payment.terms.types';
import { createApiAction } from "../action.utils";
import { updateCustomerDefaultPaymentTermAPI, updateDefaultPaymentTermAPI } from "../../api/payment-terms.api";
import { getCompanyProfileAction } from "../user/user.action";
import { success, error } from "../snackbar/snackbar.action";

export const setPaymentTerms = (paymentTerms: any) => {
  return {
    'payload': paymentTerms,
    'type': types.SET_PAYMENT_TERMS
  };
};

export const setPaymentTermsLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_PAYMENT_TERMS_LOADING
  };
};

export const refreshPaymentTerms = (refresh: any) => {
  return {
    'payload': refresh,
    'type': types.SET_REFRESH_PAYMENT_TERMS_STATUS
  };
};

export const updatePaymentTermsAction = (paymentTermId: string, company: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: types.UPDATING_PAYMENT_TERM,
      payload: true
    });
    const paymentTerm: any = await updateDefaultPaymentTermAPI({paymentTermId});
    if (paymentTerm.hasOwnProperty('msg')){
      dispatch({
        type: types.UPDATE_PAYMENT_TERMS_FAILED,
        payload: true
      });
    } else {
      dispatch(getCompanyProfileAction(company));
      dispatch({
        type: types.UPDATE_PAYMENT_TERMS,
        payload: paymentTerm
      });
    }
  }
}

export const updateCustomerPaymentTermsAction = (paymentTermId: string, customerId: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: types.UPDATING_PAYMENT_TERM,
      payload: true
    });
    const paymentTerm: any = await updateCustomerDefaultPaymentTermAPI({paymentTermId, customerId});
    if (paymentTerm.hasOwnProperty('msg')){
      dispatch({
        type: types.UPDATE_PAYMENT_TERMS_FAILED,
        payload: true
      });
      dispatch(error(paymentTerm.msg));
    } else {
      dispatch({
        type: types.UPDATE_PAYMENT_TERMS,
        payload: paymentTerm
      });
      dispatch(success('Customer payment terms successfully updated'));
    }
  }
}
