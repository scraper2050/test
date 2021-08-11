// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/payment-terms/payment.terms.types';
import { updatePaymentTermsAction } from "../actions/payment-terms/payment.terms.action";

const initialPaymentTerms = {
  'data': [],
  'isLoading': false,
  'refresh': true,
  'updating': false,
  'done': false,
  'error': ''
};

export default (state = initialPaymentTerms, { payload, type }: ReducerParamsInterface) => {
  switch (type) {
    case types.SET_PAYMENT_TERMS:
      return {
        ...state,
        'data': [...payload]
      };
    case types.SET_PAYMENT_TERMS_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_REFRESH_PAYMENT_TERMS_STATUS:
      return {
        ...state,
        'refresh': payload
      };

    case types.UPDATING_PAYMENT_TERM:
      return {
        ...state,
        'updating': payload
      };

    case types.UPDATE_PAYMENT_TERMS:
      return {
        ...state,
        'updating': false
      };

    case types.UPDATE_PAYMENT_TERMS_FAILED:
      return {
        ...state,
        'updating': false
      };

    default:
      return state;
  }
};

