import { InventoryActionType, InventoryState } from './../actions/inventory/inventory.types';
import { Reducer } from 'redux';

const initialInventory: InventoryState = {
    loading: false,
    data: []
}

export const InventoryReducer: Reducer<any> = (state = initialInventory, action) => {
    switch (action.type) {
        case InventoryActionType.GET:
            return {
                loading: true,
                data: initialInventory,
            };
        case InventoryActionType.SUCCESS:
            return {
                loading: false,
                data: [...action.payload],
            }
        case InventoryActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case InventoryActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

