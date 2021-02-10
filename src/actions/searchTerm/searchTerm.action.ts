import { types } from './searchTerm.types';

export const setSearchTerm = (searchTerm: any) => {
  return {
    'payload': searchTerm,
    'type': types.SET_SEARCH_TERM
  };
};

