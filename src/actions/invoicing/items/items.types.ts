export enum ItemActionTypes {
    GET_ITEMS = 'GET_ITEMS',
    UPDATE_ITEM = 'UPDATE_ITEM'
}


export interface Item {
    _id: string;
    name: string;
    isFixed: boolean;
    charges: number;
    tax: number;
    company: string;
}
