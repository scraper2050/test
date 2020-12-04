import { TechniciansActionType, TechniciansState } from './../actions/technicians/technicians.types';
import { Reducer } from 'redux';

const initialVendors: TechniciansState = {
    loading: false,
    data: []
}

export const TechniciansReducer: Reducer<any> = (state = initialVendors, action) => {
    switch (action.type) {
        case TechniciansActionType.GET:
            return {
                loading: true,
                data: initialVendors,
            };
        case TechniciansActionType.SUCCESS:
            return {
                loading: false,
                data: [...action.payload],
            }
        case TechniciansActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case TechniciansActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

