import { Reducer } from 'redux';
import {ChatState, types} from "../actions/chat/bc-chat.types";

const initialChat: ChatState = {
  newMessage: null,
};

export const ChatReducer: Reducer<any> = (state = initialChat, {type, payload}) => {
  switch (type) {
    case (types.SET_NEW_MESSAGE):
      return {
        ...state,
        newMessage: payload,
      };
    default:
      return state;
  }
};

