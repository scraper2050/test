import { getOfficeAdmin as fetchOfficeAdmin } from 'api/office-admin.api';
import { OfficeAdminsActionType } from './office-admin.types';

export const loadingOfficeAdmin = () => {
    return {
        type: OfficeAdminsActionType.GET
    }
}

export const getOfficeAdmin = () => {
    return async (dispatch: any) => {
        const officeAdmin: any = await fetchOfficeAdmin();
        dispatch(setOfficeAdmin(officeAdmin));
    };
}

export const setOfficeAdmin = (groups: any) => {
    return {
        type: OfficeAdminsActionType.SET,
        payload: groups
    }
}