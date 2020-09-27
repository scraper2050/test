import { ManagersActionType, ManagersState } from './../actions/managers/managers.types';
import { Reducer } from 'redux';

const initialVendors: ManagersState = {
    loading: false,
    data: []
}

export const ManagersReducer: Reducer<any> = (state = initialVendors, action) => {
    switch (action.type) {
        case ManagersActionType.GET:
            return {
                loading: true,
                data: initialVendors,
            };
        case ManagersActionType.SUCCESS:
            return {
                loading: false,
                data: [...action.payload],
            }
        case ManagersActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case ManagersActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

