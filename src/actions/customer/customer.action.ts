
import { createApiAction } from '../action.utils';
import { CustomersActionType, types } from '../../reducers/customer.types'
import { getCustomers as fetchCustomers, updateCustomers } from 'api/customer.api';

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

export const updateCustomerAction = (customers: any, callback?:any) => {
    return async (dispatch: any) => {
        const customer: any = await updateCustomers(customers);
        if (customer.hasOwnProperty('msg')) {
            dispatch({ type: CustomersActionType.UPDATE_CUSTOMER_FAILED, payload: customer.msg });
            callback();
        } else {
            dispatch({ type: CustomersActionType.UPDATE_CUSTOMER, payload: customer });
            callback();
        }
    };
}


