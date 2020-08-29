
import { createApiAction } from '../action.utils';
import { types } from './customer.types';

export const loadCustomersActions = createApiAction(types.CUSTOMER_LOAD);
export const newCustomerAction = createApiAction(types.CUSTOMER_NEW);
export const deleteCustomerActions = createApiAction(types.CUSTOMER_REMOVE);
