export const types = {
  'SET_NEW_MESSAGE': 'newMessage',
  'SET_MESSAGE_READ': 'messageRead',
};

export interface ChatState {
  newMessage: any,
  messageRead: any,
}
