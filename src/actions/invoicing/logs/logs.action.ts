import { LogActionTypes } from './logs.types';
import { createApiAction } from 'actions/action.utils';


export const loadInvoiceLogs = createApiAction(LogActionTypes.GET_LOGS);

