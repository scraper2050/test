import { types } from './customer-equipment.types';

export const setCustomerEquipments = (jobs: any) => {
    return {
        payload: jobs,
        type: types.SET_CUSTOMER_EQUIPMENTS,
    };
};

export const setCustomerEquipmentsLoading = (isLoading: any) => {
    return {
        payload: isLoading,
        type: types.SET_CUSTOMER_EQUIPMENTS_LOADING,
    };
};

export const refreshCustomerEquipments = (refresh: any) => {
    return {
        payload: refresh,
        type: types.SET_REFRESH_CUSTOMER_EQUIPMENTS_STATUS,
    };
};
