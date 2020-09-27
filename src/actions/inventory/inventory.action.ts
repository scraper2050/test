import { getInventory as fetchInventory } from 'api/inventory.api';
import { InventoryActionType } from './inventory.types';

export const loadingInventory = () => {
    return {
        type: InventoryActionType.GET
    }
}

export const getInventory = () => {
    return async (dispatch: any) => {
        const inventory: any = await fetchInventory();
        dispatch(setInventory(inventory));
    };
}

export const setInventory = (inventory: any) => {
    return {
        type: InventoryActionType.SET,
        payload: inventory
    }
}