
import { ReducerParamsInterface } from 'reducers';
import { types } from '../actions/searchTerm/searchTerm.types';

const initialSearchTerm = {
  'text': '',
};

export default (state = initialSearchTerm, { payload, type }: ReducerParamsInterface) => {
  switch (type) {
    case types.SET_SEARCH_TERM:
      return {
        ...state,
        'text': payload
      };
    default:
      return state;
  }
};

