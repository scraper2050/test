export const types = {
  'CREATE_SALES_TAX': 'CREATE_SALES_TAX',
  'SET_REFRESH_SALES_TAX_STATUS': 'SET_REFRESH_SALES_TAX_STATUS',
  'SET_SALES_TAX': 'SET_SALES_TAX',
  'SET_SALES_TAX_LOADING': 'SET_SALES_TAX_LOADING',
  'UPDATE_SALES_TAX': 'UPDATE_SALES_TAX'
};

export interface TaxItem {
  _id: string;
  state: string;
  tax: number;
  company: string;
}