export interface Job {
    _id: string
    dataTime: Date
    estimate: string
    customer: string
    type: string
    comment: string
    status: string
    company: string
    isFixed: string
    charges: number
    startTime: Date
    endTime: Date
}

export interface JobsSate {
    readonly loading: boolean
    readonly jobs?: Job[]
    readonly error?: string
}

export enum JobActionType {
    GET = 'getJobs',
    SUCCESS = 'getJobsSuccess',
    FAILED = 'getJobsFailed'
}

export interface InvoiceItem {
    name: string
    description: string
    price: number
    tax: number
    quantity: number
    unit: number
}
