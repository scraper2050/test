import { createApiAction } from "../action.utils";
import { CustomersActionType, types } from "../../reducers/customer.types";
import {
  getCustomers as fetchCustomers,
  updateCustomers,
  getCustomerDetail,
  createCustomer,
} from "api/customer.api";
import { info, error } from "actions/snackbar/snackbar.action";

export const loadCustomersActions = createApiAction(types.CUSTOMER_LOAD);
export const newCustomerAction = createApiAction(types.CUSTOMER_NEW);
export const deleteCustomerActions = createApiAction(types.CUSTOMER_REMOVE);

export const loadingCustomers = () => {
  return {
    type: CustomersActionType.GET,
  };
};
export const loadingSingleCustomers = () => {
  return {
    type: types.GET_SINGLE_CUSTOMER,
  };
};

export const getCustomers = () => {
  return async (dispatch: any) => {
    const customers: any = await fetchCustomers();
    if (customers.status === 0) {
      dispatch(error(customers.message));
      dispatch(setCustomers([]));
    } else {
      dispatch(setCustomers(customers.customers));
    }
  };
};

export const setCustomers = (customers: any) => {
  return {
    type: types.SET_CUSTOMERS,
    payload: customers,
  };
};

export const getCustomerDetailAction = (data: any) => {
  return async (dispatch: any) => {
    const customer: any = await getCustomerDetail(data);

    console.log(customer, 'customer')
    dispatch({ type: types.SET_SINGLE_CUSTOMER, payload: customer });
  };
};

export const updateCustomerAction = (customers: any, callback?: any) => {
  return async (dispatch: any) => {
    const customer: any = await updateCustomers(customers);
    if (customer.hasOwnProperty("msg")) {
      dispatch({
        type: CustomersActionType.UPDATE_CUSTOMER_FAILED,
        payload: customer.msg,
      });
      callback();
    } else {
      dispatch({
        type: CustomersActionType.UPDATE_CUSTOMER,
        payload: customer,
      });
      callback();
    }
  };
};
