
import { createApiAction } from '../action.utils';
import { CustomersActionType, types } from '../../reducers/customer.types'
import { getCustomers as fetchCustomers } from 'api/customer.api';

export const loadCustomersActions = createApiAction(types.CUSTOMER_LOAD);
export const newCustomerAction = createApiAction(types.CUSTOMER_NEW);
export const deleteCustomerActions = createApiAction(types.CUSTOMER_REMOVE);

export const loadingCustomers = () => {
    return {
        type: CustomersActionType.GET
    }
}

export const getCustomers = () => {
    return async (dispatch: any) => {
        const customers: any = await fetchCustomers();
        dispatch(setCustomers(customers));
    };
}

export const setCustomers = (customers: any) => {
    return {
        type: types.SET_CUSTOMERS,
        payload: customers
    }
}


