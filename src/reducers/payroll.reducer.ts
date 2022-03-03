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
      const contractors = [...state.contractors];
      const i = contractors.findIndex((contractor: Contractor) => contractor._id === payload._id);
      if (i >= 0) contractors[i] = payload;
      console.log({i})
      return {
        ...state,
        contractors,
      };
    default:
      return state;
  }
};

