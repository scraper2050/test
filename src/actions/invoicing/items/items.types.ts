export enum ItemActionTypes {
    GET_ITEMS = 'GET_ITEMS',
    UPDATE_ITEM = 'UPDATE_ITEM',
    UPDATE_TIER = 'LOAD_TIER',
}


export interface Item {
    _id: string;
    name: string;
    isFixed: boolean;
    charges: number;
    tax: number;
    company: string;
}
