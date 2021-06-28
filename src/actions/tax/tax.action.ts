import { types } from './tax.types';
import { createApiAction } from 'actions/action.utils';
export const setSalesTax = (taxes: any) => {
  return {
    'payload': taxes,
    'type': types.SET_SALES_TAX
  };
};
export const setSalesTaxLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_SALES_TAX_LOADING
  };
};
export const refreshSalesTax = (refresh: any) => {
  return {
    'payload': refresh,
    'type': types.SET_REFRESH_SALES_TAX_STATUS
  };
};


export const createSalesTaxAction = createApiAction(types.CREATE_SALES_TAX);
export const updateSalesTaxAction = createApiAction(types.UPDATE_SALES_TAX);
