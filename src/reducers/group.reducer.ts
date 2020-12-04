import { GroupActionType, GroupState } from './../actions/group/group.types';
import { Reducer } from 'redux';

const initialVendors: GroupState = {
    loading: false,
    data: []
}

export const GroupReducer: Reducer<any> = (state = initialVendors, action) => {
    switch (action.type) {
        case GroupActionType.GET:
            return {
                loading: true,
                data: initialVendors,
            };
        case GroupActionType.SUCCESS:
            return {
                loading: false,
                data: [...action.payload],
            }
        case GroupActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case GroupActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

