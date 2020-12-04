export interface OfficeAdminsState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum OfficeAdminsActionType {
    GET = 'getOfficeAdmins',
    SET = 'setOfficeAdmins',
    SUCCESS = 'getOfficeAdminsSuccess',
    FAILED = 'getOfficeAdminsFailed',
}