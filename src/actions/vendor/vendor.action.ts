import { createApiAction } from '../action.utils';
import { types } from './vendor.types';


import { getCompanyContracts, getContractorDetail } from 'api/vendor.api';
import { VendorActionType } from './vendor.types';


export const loadCompanyContractsActions = createApiAction(types.COMPANY_CONTRACTS_LOAD);

export const loadingVendors = () => {
  return {
    type: VendorActionType.GET
  }
}

export const getVendors = () => {
  return async (dispatch: any) => {
    const vendors: any = await getCompanyContracts();
    dispatch(setVendors(vendors));
  };
}

export const loadingSingleVender = () => {
  return {
    type: VendorActionType.GET_SINGLE_VENDOR
  }
}

export const getVendorDetailAction = (data: any) => {
  return async (dispatch: any) => {
    const vendor: any = await getContractorDetail(data);
    dispatch({ type: VendorActionType.SET_SINGLE_VENDOR, payload: vendor });
  };
}

export const setVendors = (vendors: any) => {
  return {
    type: VendorActionType.SET,
    payload: vendors
  }
}


