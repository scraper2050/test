import { createApiAction } from '../action.utils';
import { types } from './vendor.types';


import { getCompanyContracts } from 'api/vendor.api';
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

export const setVendors = (vendors: any) => {
    return {
        type: VendorActionType.SET,
        payload: vendors
    }
}


