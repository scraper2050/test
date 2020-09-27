export interface TechniciansState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum TechniciansActionType {
    GET = 'getTechnicians',
    SET = 'setTechnicians',
    SUCCESS = 'getTechniciansSuccess',
    FAILED = 'getTechniciansFailed',
}