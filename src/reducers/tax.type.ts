export interface SalesTax {
    _id: string
    state: string
    tax: number
    company: string
    createdBy: string
    createdAt: Date
    __V: number    
}

export interface TaxsState {
    readonly loading: boolean
    readonly taxs?: SalesTax[]
    readonly error?: string
}

export enum TaxsActionType {
    GET = 'getTaxs',
    SUCCESS = 'getTaxsSuccess',
    FAILED = 'getTaxsFailed'
}
