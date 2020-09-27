export interface GroupState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum GroupActionType {
    GET = 'getGroup',
    SET = 'setGroup',
    SUCCESS = 'getGroupSuccess',
    FAILED = 'getGroupFailed',
}