
import { createApiAction } from '../action.utils';
import { types } from './customer.types';

export const customersLoad = createApiAction(types.CUSTOMER_LOAD);
export const customerAdd = createApiAction(types.CUSTOMER_ADD);
export const customerRemove = createApiAction(types.CUSTOMER_REMOVE);
