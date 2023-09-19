
import { QBAccountsState } from './qbaccounts.type';
import { Reducer } from 'redux';
import { loadQBAccounts } from 'actions/quickbookAccount/quickbook.action';

export type { QBAccountsState };

const initialState: QBAccountsState = {
  'error': '',
  'accountsObj': {
    'Name': '',
    'SubAccount': false,
    'FullyQualifiedName': '',
    'Active': false,
    'Classification': '',
    'AccountType': '',
    'AccountSubType': '',
    'CurrentBalance': 0,
    'CurrentBalanceWithSubAccounts': 0,
    'CurrencyRef': '',
    'domain': '',
    'sparse': false,
    'Id': '',
    'SyncToken': '',
    'MetaData': ''
  },
  'accounts': [],
  'loading': false,
  'loadingObj': false
};


export const QBAccountsReducer: Reducer = (state = initialState, action) => {

  switch (action.type) {

    case loadQBAccounts.fetch.toString():
      return {
        ...state,
        'loading': true,
        'data': initialState

      };
    case loadQBAccounts.success.toString():

      return {
        ...state,
        'accounts': action.payload,
        'loading': false
      };
    case loadQBAccounts.fault.toString():
      
    return {
        ...state,
        'error': action.payload,
        'loading': false
      };
    case loadQBAccounts.cancelled.toString():

      return {
        ...state,
        'loading': false
      };

    default:

      return state;
  }
};