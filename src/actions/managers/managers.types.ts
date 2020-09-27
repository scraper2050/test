export interface ManagersState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum ManagersActionType {
    GET = 'getManagers',
    SET = 'setManagers',
    SUCCESS = 'getManagersSuccess',
    FAILED = 'getManagersFailed',
}