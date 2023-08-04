export enum LogActionTypes {
    GET_LOGS = 'GET_LOGS',
}


export  enum logType {
    CREATED = 'CREATED ',
    UPDATED = 'UPDATED ',
    VOID = 'VOID ',
    DUPLICATE = 'DUPLICATE '
}

export interface Logs {
    invoiceId: string
    invoice: any,
    oldInvoiceId: string,
    company:any,
    companyLocation: any,
    workType: any,
    customer: any,
    createdAt?: Date
    createdBy: any
    updatedAt?: Date
    type: logType
}