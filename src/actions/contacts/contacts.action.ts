import { types } from './contacts.types';

export const setContacts = (contacts: any) => {
  return {
    payload: contacts,
    type: types.SET_CONTACTS,
  };
};

export const setContactsLoading = (isLoading: any) => {
  return {
    payload: isLoading,
    type: types.SET_CONTACTS_LOADING,
  };
};

export const refreshContacts = (refresh: any) => {
  return {
    payload: refresh,
    type: types.SET_REFRESH_CONTACTS_STATUS,
  };
};
