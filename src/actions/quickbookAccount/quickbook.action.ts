import { QBActionTypes } from './quickbook.types';
import { createApiAction } from 'actions/action.utils';


export const loadQBAccounts = createApiAction(QBActionTypes.GET_QB_ACCOUNTS);

