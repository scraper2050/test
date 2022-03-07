import {
  Contractor,
  PayrollActionType,
  PayrollState,
  types
} from 'actions/payroll/payroll.types';
import { Reducer } from 'redux';
import { cancelOrFinishContractActions } from 'actions/vendor/vendor.action';

const initialPayroll: PayrollState = {
  loading: false,
  contractors: [],
  payments: [],
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
    case (types.SET_CONTRACTOR):
    case (types.REMOVE_CONTRACTOR):
      console.log({type})
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
    default:
      return state;
  }
};

