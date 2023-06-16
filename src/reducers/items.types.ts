export interface Item {
    isFixed: boolean;
    charges: number;
    tax: number,
    isActive: boolean,
    _id: string,
    name: string,
    tiers: any[],
    costingList: any[];
}

export interface InvoiceItemsState {
    loading: boolean;
    loadingObj: boolean;
    error: string;
    items: Item[];
    itemObj: Item;
}

