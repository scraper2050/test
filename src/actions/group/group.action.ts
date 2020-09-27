import { getGroups as fetchGroups } from 'api/group.api';
import { GroupActionType } from './group.types';

export const loadingGroups = () => {
    return {
        type: GroupActionType.GET
    }
}

export const getGroups = () => {
    return async (dispatch: any) => {
        const groups: any = await fetchGroups();
        dispatch(setGroups(groups));
    };
}

export const setGroups = (groups: any) => {
    return {
        type: GroupActionType.SET,
        payload: groups
    }
}
