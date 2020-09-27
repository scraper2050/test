export interface InvoicingState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum InvoicingTodosActionType {
    GET = 'getTodos',
    SET = 'setTodos',
    SUCCESS = 'getTodosSuccess',
    FAILED = 'getTodosFailed',
}

export enum InvoicingListActionType {
    GET = 'getInvoicingList',
    SET = 'setInvoicingList',
    SUCCESS = 'getInvoicingListSuccess',
    FAILED = 'getInvoicingListFailed',
}

export enum InvoicingPurchaseOrdersActionType {
    GET = 'getPurchaseOrders',
    SET = 'setPurchaseOrders',
    SUCCESS = 'getPurchaseOrdersSuccess',
    FAILED = 'getPurchaseOrdersFailed',
}

export enum InvoicingEstimatesActionType {
    GET = 'getEstimates',
    SET = 'setEstimates',
    SUCCESS = 'getEstimatesSuccess',
    FAILED = 'getEstimatesFailed',
}