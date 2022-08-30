import {
  Contractor, ContractorPayment,
  PayrollState,
  types
} from 'actions/payroll/payroll.types';
import { Reducer } from 'redux';
import { cancelOrFinishContractActions } from 'actions/vendor/vendor.action';

const initialPayroll: PayrollState = {
  loading: false,
  contractors: [],
  payments: [],
  refresh: false,
};

export const PayrollReducer: Reducer<any> = (state = initialPayroll, {type, payload}) => {
  switch (type) {
    case (types.SET_CONTRACTOR_LOADING):
      return {
        ...state,
        loading: payload
      };
    case (types.SET_CONTRACTORS):
      return {
        ...state,
        contractors: payload,
        loading: false,
      };
    case (types.REFRESH_CONTRACTOR_PAYMENT):
      return {
        ...state,
        refresh: payload,
      };
    case (types.SET_CONTRACTOR):
    case (types.REMOVE_CONTRACTOR):
      const contractors = [...state.contractors];
      const i = contractors.findIndex((contractor: Contractor) => contractor._id === payload._id);
      if (i >= 0) {
        if (type === types.SET_CONTRACTOR)
          contractors[i] = payload;
        else
          contractors.splice(i, 1);
      }
      return {
        ...state,
        contractors,
      };
    case (types.SET_CONTRACTOR_PAYMENTS):
      return {
        ...state,
        payments: payload,
        loading: false,
      };
    case (types.UPDATE_CONTRACTOR_PAYMENT):
    case (types.REMOVE_CONTRACTOR_PAYMENT):
      const payments = [...state.payments];
      const index = payments.findIndex((payment: ContractorPayment) => payment._id === payload._id);
      if (index >= 0) {
        if (type === types.UPDATE_CONTRACTOR_PAYMENT)
          payments[index] = {...payments[index], ...payload};
        else
          payments.splice(index, 1);
      }
      return {
        ...state,
        payments,
      };
    default:
      return state;
  }
};

