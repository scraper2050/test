import { VendorActionType, VendorsState, } from 'actions/vendor/vendor.types';
import { Reducer } from 'redux';

const initialVendors: VendorsState = {
  loading: false,
  data: [],
}

export const VendorsReducer: Reducer<any> = (state = initialVendors, action) => {
  switch (action.type) {
    case VendorActionType.GET:
      return {
        loading: true,
        data: initialVendors,
      };
    case VendorActionType.SUCCESS:
      return {
        loading: false,
        data: [...action.payload],
      }
    case VendorActionType.GET_SINGLE_VENDOR:
      return {
        ...state,
        loading: true,
      }
    case VendorActionType.SET_SINGLE_VENDOR:
      return {
        ...state,
        loading: false,
        vendorObj: action.payload,
      }
    case VendorActionType.SET:
      return {
        loading: false,
        data: [...action.payload],
      }
    case VendorActionType.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
  }
  return state;
}

