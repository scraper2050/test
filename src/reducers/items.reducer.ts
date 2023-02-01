
import { InvoiceItemsState, Item } from './items.types';
import { Reducer } from 'redux';
import { loadInvoiceItems, loadTierListItems, updateInvoiceItem } from 'actions/invoicing/items/items.action';

export type { InvoiceItemsState };

const initialState: InvoiceItemsState = {
  'error': '',
  'itemObj': {
    'isFixed': false,
    'charges': 0,
    'tax': 0,
    'isActive': false,
    '_id': '',
    'name': '',
    'tiers': []
  },
  'items': [],
  'loading': false,
  'loadingObj': false
};


const tierListInitialState: any = {
  'error': '',
  'loading': true,
  'tiers': []
};

export const InvoiceItemsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case loadInvoiceItems.fetch.toString():
      return {
        ...state,
        'loading': true
      };
    case loadInvoiceItems.success.toString():
      return {
        ...state,
        'items': action.payload,
        'loading': false
      };
    case loadInvoiceItems.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false
      };
    case loadInvoiceItems.cancelled.toString():
      return {
        ...state,
        'loading': false
      };

    case updateInvoiceItem.fetch():
      return {
        ...state,
        'loadingObj': true
      };

    case updateInvoiceItem.success.toString():
      if (action.payload.tiers) {
        delete action.payload.tiers;
      }
      return {
        ...state,
        'itemObj': {
          ...action.payload,
          '_id': action.payload.itemId
        },
        'items': state.items.map((item: Item) => item._id === action.payload.itemId
          ? {
            ...item,
            ...action.payload,
            'tax': action.payload.tax
              ? 1
              : 0,
            '_id': action.payload.itemId
          }
          : item),
        'loadingObj': false
      };

    case updateInvoiceItem.cancelled.toString():
      return {

        ...state,
        'itemObj': {},
        'loadingObj': false
      };

    default:
      return state;
  }
};


export const InvoiceItemsTierList: Reducer = (state = tierListInitialState, action) => {
  switch (action.type) {
    case loadTierListItems.success.toString():
      return {
        ...state,
        'loading': false,
        'tiers': action.payload
      };

    case loadTierListItems.fetch.toString():
      return {
        ...state,
        'loading': true
      };

    case loadTierListItems.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false
      };

    default:
      return state;
  }
};
