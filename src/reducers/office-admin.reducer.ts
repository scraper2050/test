import { OfficeAdminsActionType, OfficeAdminsState } from './../actions/office-admin/office-admin.types';
import { Reducer } from 'redux';

const initialVendors: OfficeAdminsState = {
    loading: false,
    data: []
}

export const OfficeAdminReducer: Reducer<any> = (state = initialVendors, action) => {
    switch (action.type) {
        case OfficeAdminsActionType.GET:
            return {
                loading: true,
                data: initialVendors,
            };
        case OfficeAdminsActionType.SUCCESS:
            return {
                loading: false,
                data: [...action.payload],
            }
        case OfficeAdminsActionType.SET:
            return {
                loading: false,
                data: [...action.payload],
            }
        case OfficeAdminsActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state;
}

