import { Reducer } from 'redux';
import { types } from "../actions/contacts/contacts.types";

const initialContacts = {
  isLoading: false,
  refresh: true,
  contacts: [],
}

export const contactsReducer: Reducer<any> = (
  state = initialContacts,
  { payload, type }
) => {
  switch (type) {
    case types.SET_CONTACTS_LOADING:
      return {
        ...state,
        refresh: false,
        isLoading: payload
      };
    case types.SET_REFRESH_CONTACTS_STATUS:
      return {
        ...state,
        refresh: payload
      };
    case types.SET_CONTACTS:
      return {
        ...state,
        isLoading: false,
        refresh: false,
        contacts: [...payload],
      };
    default:
      return state;
  }
}