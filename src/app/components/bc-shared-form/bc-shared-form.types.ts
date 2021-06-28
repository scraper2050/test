export enum FormTypes {
    PURCHASE_ORDER = 'Purchase Order',
    ESTIMATE = 'Estimate',
    INVOICE = 'Invoice'
}

export interface FormDefaultProps {
    addItemText: string;
    dueDateText: string;
    idText: string;
    issueDateText: string;
    referenceNumberPlaceholder: string;
    pageTitle: string;
    previewTitle: string;
}
