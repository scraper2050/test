import { getManagers as fetchManagers } from 'api/managers.api';
import { ManagersActionType } from './managers.types';

export const loadingManagers = () => {
    return {
        type: ManagersActionType.GET
    }
}

export const getManagers = () => {
    return async (dispatch: any) => {
        const managers: any = await fetchManagers();
        dispatch(setManagers(managers));
    };
}

export const setManagers = (managers: any) => {
    return {
        type: ManagersActionType.SET,
        payload: managers
    }
}