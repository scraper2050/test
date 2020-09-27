import { PurchasedTagsActionType, TagsState } from './../actions/tags/tags.types';
import { Reducer } from 'redux';

const initialVendors: TagsState = {
    loading: false,
    data: []
}

export const PurchasedTagsReducer: Reducer<any> = (state = initialVendors, action) => {
    switch (action.type) {
        case PurchasedTagsActionType.GET:
            return {
                loading: true,
                data: initialVendors,
            };
        case PurchasedTagsActionType.SUCCESS:
            return {
                loading: false,
                data: [...action.payload],
            }
        case PurchasedTagsActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case PurchasedTagsActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

