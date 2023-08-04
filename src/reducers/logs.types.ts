

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
    company: any,
    companyLocation: any,
    workType: any,
    customer: any,
    createdBy: any,
    type: string
}

export interface InvoiceLogsState {
    loading: boolean;
    loadingObj: boolean;
    error: string;
    logs: Logs[];
    LogsObj: Logs;
}

