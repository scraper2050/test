import { Reducer } from 'redux';
import { loadSubscriptions } from 'actions/subscription/subscription.action';


export interface SubscriptionState {
    error: string | undefined;
    loading: boolean;
    subscriptions: []
}

const initialSubscriptionState:SubscriptionState = {
  'error': undefined,
  'loading': false,
  'subscriptions': []

};

export const SubscriptionReducer: Reducer<any> = (state = initialSubscriptionState, action) => {
  switch (action.type) {
    case loadSubscriptions.fetch.toString():

      return {
        ...state,
        'loading': true
      };
    case loadSubscriptions.cancelled.toString():
      return {
        ...state,
        'loading': false
      };
    case loadSubscriptions.success.toString():
      return {
        ...state,
        'loading': false,
        'subscriptions': action.payload
      };
    case loadSubscriptions.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false
      };
    default:
      break;
  }
  return state;
};
