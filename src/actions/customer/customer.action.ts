
import { createApiAction } from '../action.utils';
import { types } from '../../reducers/customer.types';
import {CustomersActionType} from '../../reducers/customer.types'

export const loadCustomersActions = createApiAction(types.CUSTOMER_LOAD);
export const newCustomerAction = createApiAction(types.CUSTOMER_NEW);
export const deleteCustomerActions = createApiAction(types.CUSTOMER_REMOVE);


export const getCustomers = () => {
    return {
        type: CustomersActionType.GET
    }
}


