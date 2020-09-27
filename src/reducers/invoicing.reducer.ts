import {
    InvoicingState,
    InvoicingTodosActionType,
    InvoicingListActionType,
    InvoicingPurchaseOrdersActionType,
    InvoicingEstimatesActionType
} from './../actions/invoicing/invoicing.types';
import { Reducer } from 'redux';

const initialState: InvoicingState = {
    loading: false,
    data: []
}

export const InvoicingTodoReducer: Reducer<any> = (state = initialState, action) => {
    switch (action.type) {
        case InvoicingTodosActionType.GET:
            return {
                loading: true,
                data: initialState,
            };
        case InvoicingTodosActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case InvoicingTodosActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

export const InvoicingListReducer: Reducer<any> = (state = initialState, action) => {
    switch (action.type) {
        case InvoicingListActionType.GET:
            return {
                loading: true,
                data: initialState,
            };
        case InvoicingListActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case InvoicingListActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

export const InvoicingPurchaseOrderReducer: Reducer<any> = (state = initialState, action) => {
    switch (action.type) {
        case InvoicingPurchaseOrdersActionType.GET:
            return {
                loading: true,
                data: initialState,
            };
        case InvoicingPurchaseOrdersActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case InvoicingPurchaseOrdersActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

export const InvoicingEstimatesReducer: Reducer<any> = (state = initialState, action) => {
    switch (action.type) {
        case InvoicingEstimatesActionType.GET:
            return {
                loading: true,
                data: initialState,
            };
        case InvoicingEstimatesActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case InvoicingEstimatesActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}
