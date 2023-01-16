import { types } from './bc-chat.types';

export const setNewMessage = (payload: any) => {
  return {
    payload,
    type: types.SET_NEW_MESSAGE,
  };
};

export const setMessageRead = (payload: any) => {
  return {
    payload,
    type: types.SET_MESSAGE_READ,
  };
};

