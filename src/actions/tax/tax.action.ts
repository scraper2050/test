import { types } from './tax.types';
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
