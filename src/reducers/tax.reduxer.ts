// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/tax/tax.types';

const initialSalesTax = {
  'data': [],
  'isLoading': false,
  'refresh': true
};

export default (state = initialSalesTax, { payload, type }: ReducerParamsInterface) => {
  switch (type) {
    case types.SET_SALES_TAX:
      return {
        ...state,
        'data': [...payload]
      };
    case types.SET_SALES_TAX_LOADING:
      return {
        ...state,
        'isLoading': payload
      };
    case types.SET_REFRESH_SALES_TAX_STATUS:
      return {
        ...state,
        'refresh': payload
      };
    default:
      return state;
  }
};

