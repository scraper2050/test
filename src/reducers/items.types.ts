export interface Item {
    isFixed: boolean;
    charges: number;
    tax: number,
    isActive: boolean,
    _id: string,
    name: string,
}

export interface InvoiceItemsState {
    loading: boolean;
    loadingObj: boolean;
    error: string;
    items: Item[];
    itemObj: Item;
}

