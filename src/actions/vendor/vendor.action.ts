import {createApiAction} from '../action.utils';
import {types} from './vendor.types';


import {
  getCompanyContracts,
  getContractorDetail,
  setVendorDisplayNameApi
} from 'api/vendor.api';
import {VendorActionType} from './vendor.types';
import {error as errorSnackBar, success} from "../snackbar/snackbar.action";


export const loadCompanyContractsActions = createApiAction(types.COMPANY_CONTRACTS_LOAD);
export const cancelOrFinishContractActions = createApiAction(types.COMPANY_CONTRACT_CANCEL_OR_FINISH);

export const loadingVendors = () => {
  return {
    'type': VendorActionType.GET
  };
};

export const getVendors = (filter?: any) => {
  return async (dispatch: any) => {
    const vendors: any = await getCompanyContracts(filter);
    dispatch(setVendors(vendors));
  };
};

export const loadingSingleVender = () => {
  return {
    'type': VendorActionType.GET_SINGLE_VENDOR
  };
};

export const getVendorDetailAction = (data: any) => {
  return async (dispatch: any) => {
    const vendor: any = await getContractorDetail(data);
    dispatch({
      'type': VendorActionType.SET_SINGLE_VENDOR,
      'payload': vendor
    });
  };
};

export const setVendors = (vendors: any) => {
  return {
    'type': VendorActionType.SET,
    'payload': vendors
  };
};

export const updateVendorPayment = (payment: any) => {
  return {
    'type': VendorActionType.UPDATE_SINGLE_VENDOR_PAYMENT,
    'payload': payment,
  };
};

export const deleteVendorPayment = (payment: any) => {
  return {
    'type': VendorActionType.DELETE_SINGLE_VENDOR_PAYMENT,
    'payload': payment,
  };
};

export const setVendorDisplayName = ({
                                       displayName,
                                       contractorId
                                     }: any, callback?: Function) => {
  return async (dispatch: any) => {
    const result: any = await setVendorDisplayNameApi({
      displayName,
      contractorId
    });

    if (result.status === 1) {
      dispatch({
        'type': VendorActionType.SET_VENDOR_DISPLAY_NAME,
        'payload': displayName,
      })
      dispatch(success(result?.message || 'Vendor display name updated successfully'));
      callback && callback();
    } else {
      dispatch(errorSnackBar(result?.message || 'Something went wrong'));
    }
  }
}


