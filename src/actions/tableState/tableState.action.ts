import { types } from './tableState.types';

export const setPageNumber = (pageNumber: any) => {
  return {
    'payload': pageNumber,
    'type': types.SET_PAGE_NUMBER
  };
};

