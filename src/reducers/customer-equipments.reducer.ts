import { Reducer } from 'redux';
import { types } from "../actions/customer/customer-equipment/customer-equipment.types";

const initialCustomerEquipments = {
  isLoading: false,
  refresh: true,
  equipments: [],
}

export const customerEquipmentsReducer: Reducer<any> = (
  state = initialCustomerEquipments,
  { payload, type }
) => {
  switch (type) {
    case types.SET_CUSTOMER_EQUIPMENTS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case types.SET_REFRESH_CUSTOMER_EQUIPMENTS_STATUS:
      return {
        ...state,
        refresh: payload
      };
    case types.SET_CUSTOMER_EQUIPMENTS:
      return {
        ...state,
        isLoading: false,
        equipments: [...payload],
      };
    default:
      return state;
  }
}