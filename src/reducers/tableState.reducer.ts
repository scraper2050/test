// Import { Reducer } from 'redux';
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/tableState/tableState.types';

const initialSalesTax = {
  'pageNumber': 0,
};

export default (state = initialSalesTax, { payload, type }: ReducerParamsInterface) => {
  switch (type) {
    case types.SET_PAGE_NUMBER:
      return {
        ...state,
        'pageNumber': payload
      };
    default:
      return state;
  }
};

