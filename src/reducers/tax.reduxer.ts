// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/tax/tax.types';
import { createSalesTaxAction, updateSalesTaxAction } from 'actions/tax/tax.action';

const initialSalesTax = {
  'data': [],
  'isLoading': false,
  'refresh': true,
  'updating': false,
  'done': false,
  'error': ''
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

    case createSalesTaxAction.fetch.toString():
      return {
        ...state,
        'updating': true
      };

    case createSalesTaxAction.success.toString():
      return {
        ...state,
        'data': [
          ...state.data,
          payload
        ],
        'updating': false,
        'done': true
      };
    case updateSalesTaxAction.fault.toString():
    case createSalesTaxAction.fault.toString():
      return {
        ...state,
        'error': payload,
        'done': false,
        'updating': false
      };
    case updateSalesTaxAction.cancelled.toString():
    case createSalesTaxAction.cancelled.toString():
      return {
        ...state,
        'done': false,
        'updating': false
      };
    case updateSalesTaxAction.fetch.toString():
      return {
        ...state,
        'updating': true
      };

    case updateSalesTaxAction.success.toString():
      return {
        ...state,
        'data': state.data.map((tax:any) => tax._id === payload.id
          ? { ...tax,
            ...payload }
          : tax),
        'done': true,
        'updating': false
      };

    default:
      return state;
  }
};

