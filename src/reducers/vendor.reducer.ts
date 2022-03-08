import { VendorActionType, VendorsState } from 'actions/vendor/vendor.types';
import { Reducer } from 'redux';
import { cancelOrFinishContractActions } from 'actions/vendor/vendor.action';
import {ContractorPayment} from "../actions/payroll/payroll.types";

const initialVendors: VendorsState = {
  loading: false,
  data: [],
  vendorObj: undefined,
  vendorPayments: [],
};

export const VendorsReducer: Reducer<any> = (state = initialVendors, action) => {
  switch (action.type) {
    case cancelOrFinishContractActions.fetch().type.toString():
      return {
        ...state,
        'contractLoading': true
      };
    case cancelOrFinishContractActions.success().type.toString():
      return {
        ...state,
        'contractLoading': false,
        'response': action.payload.message,
        'data': state.data.map((vendor:any) => vendor._id === action.payload._id
          ? { ...vendor,
            'status': action.payload.status }
          : vendor)
      };
    case cancelOrFinishContractActions.cancelled().type.toString():
      return {
        ...state,
        'response': '',
        'contractLoading': false,
        'error': ''
      };
    case cancelOrFinishContractActions.fault().type.toString():
      return {
        ...state,
        'contractLoading': false,
        'error': action.payload
      };
    case VendorActionType.GET:
      return {
        'loading': true,
        'data': []
      };
    case VendorActionType.GET_SINGLE_VENDOR:
      return {
        ...state,
        'loading': true
      };
    case VendorActionType.SET_SINGLE_VENDOR:
      return {
        ...state,
        'loading': false,
        'vendorObj': action.payload.details,
        'vendorPayments': action.payload.payments,
      };
    case VendorActionType.UPDATE_SINGLE_VENDOR_PAYMENT:
      const payments = [...state.vendorPayments];
      const index = payments.findIndex((payment: ContractorPayment) => payment._id === action.payload._id);
      if (index >= 0) {
        payments[index] = {...payments[index], ...action.payload};
      }
      return {
        ...state,
        'vendorPayments': payments,
      };
    case VendorActionType.SET:
      return {
        'loading': false,
        'data': [...action.payload]
      };
    case VendorActionType.FAILED:
      return {
        ...state,
        'loading': false,
        'error': action.payload
      };

    default:
      return state;
  }
};

