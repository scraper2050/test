import { ItemActionTypes } from './items.types';
import { createApiAction } from 'actions/action.utils';


export const loadInvoiceItems = createApiAction(ItemActionTypes.GET_ITEMS);
export const updateInvoiceItem = createApiAction(ItemActionTypes.UPDATE_ITEM)
