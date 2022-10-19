import {
  AdvanceFilterInvoiceActionType,
} from './advance-filter.types';


export const resetAdvanceFilterInvoice = () => {
  return {
    'type': AdvanceFilterInvoiceActionType.RESET
  };
};

export const applyAdvanceFilterInvoice = (filterOption: any) => {
  return {
    'type': AdvanceFilterInvoiceActionType.APPLY,
    'payload': filterOption
  };
};
