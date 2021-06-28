import { FormDefaultProps, FormTypes } from './bc-shared-form.types';

const InvoiceFormDefaultValues:FormDefaultProps = {
  'addItemText': '+ Item',
  'dueDateText': 'Due date',
  'idText': 'Invoice #',
  'issueDateText': 'Invoice Date',
  'pageTitle': 'New Invoice',
  'previewTitle': FormTypes.INVOICE as string,
  'referenceNumberPlaceholder': 'Such as PO#'


};

const EstimateFormDefaultValues:FormDefaultProps = {
  'addItemText': '+ Service/Product',
  'dueDateText': 'Due date',
  'idText': 'Estimate #',
  'issueDateText': 'Estimate Date',
  'pageTitle': 'New Estimate',
  'previewTitle': FormTypes.ESTIMATE as string,
  'referenceNumberPlaceholder': 'Purchase Order #'
};

const PurchaseOrderFormDefaultValues:FormDefaultProps = {
  'addItemText': '+ Service/Product',
  'dueDateText': 'Due date',
  'idText': 'Purchase Order #',
  'issueDateText': 'Purchase Order Date',
  'pageTitle': 'New Purchase Order',
  'previewTitle': FormTypes.PURCHASE_ORDER as string,
  'referenceNumberPlaceholder': 'Such as PO#'

};


export const FormDefaultValues = {
  [FormTypes.INVOICE]: InvoiceFormDefaultValues,
  [FormTypes.ESTIMATE]: EstimateFormDefaultValues,
  [FormTypes.PURCHASE_ORDER]: PurchaseOrderFormDefaultValues
};


