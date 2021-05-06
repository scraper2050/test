import { VendorActionType, VendorsState } from 'actions/vendor/vendor.types';
import { Reducer } from 'redux';
import { cancelOrFinishContractActions } from 'actions/vendor/vendor.action';

const initialVendors: VendorsState = {
  'loading': false,
  'data': []
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
        'vendorObj': action.payload
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

