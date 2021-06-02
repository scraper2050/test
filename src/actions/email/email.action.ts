import { createApiAction } from 'actions/action.utils';

export const RESET_EMAIL_STATE = 'RESET_EMAIL_STATE';

export const sendEmailAction = createApiAction('SEND_EMAIL');

export const resetEmailState = () => {
  return { 'type': RESET_EMAIL_STATE };
};
