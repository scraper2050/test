import { Reducer } from 'redux';
import { RESET_EMAIL_STATE, sendEmailAction } from 'actions/email/email.action';

export interface EmailState {
    error: string | null;
    loading: boolean;
    sent: boolean;
}

const initialCustomers: EmailState = {
  'error': null,
  'loading': false,
  'sent': false
};

export const EmailReducer: Reducer<any> = (
  state = initialCustomers,
  action
) => {
  switch (action.type) {
    case sendEmailAction.fetch.toString():
      return {
        ...state,
        'loading': true
      };
    case sendEmailAction.success.toString():
      return {
        ...state,
        'error': null,
        'loading': false,
        'sent': true
      };
    case sendEmailAction.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false,
        'sent': false
      };
    case sendEmailAction.cancelled.toString():
      return {
        ...state,
        'loading': false
      };

    case RESET_EMAIL_STATE:
      return {
        'error': null,
        'loading': false,
        'sent': false
      };

    default:
      return state;
  }
};
