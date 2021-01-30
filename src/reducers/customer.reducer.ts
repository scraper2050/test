import { Reducer } from "redux";
import {
  CustomersState,
  CustomersActionType,
  types,
} from "./../actions/customer/customer.types";

const initialCustomers: CustomersState = {
  loading: false,
  data: [],
  customerObj: {
    _id: "",
    info: {
      name: "",
      email: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    contact: {
      name: "",
      phone: "",
    },
    isActive: false,
    company: "",
    contactname: "",
    profile: {
      firstName: "",
      lastName: "",
      displayName: "",
    },
    vendorId: "",
  },
};

export const CustomersReducer: Reducer<any> = (
  state = initialCustomers,
  action
) => {
  switch (action.type) {
    case CustomersActionType.GET:
      return {
        ...state,
        loading: true,
        data: initialCustomers,
      };
    case CustomersActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...action.payload],
      };
    case types.SET_CUSTOMERS:
      return {
        ...state,
        loading: false,
        data: [...action.payload],
      };
    case CustomersActionType.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SET_SINGLE_CUSTOMER:
      return {
        ...state,
        loading: false,
        customerObj: action.payload,
      };
    case types.GET_SINGLE_CUSTOMER:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_CUSTOMER_FAILED:
      return {
        ...state,
        loading: false,
        customerObj: state.customerObj,
      };
  }
  return state;
};
