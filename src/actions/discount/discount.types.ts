export const DiscountItemActionTypes = {
  'SET_DISCOUNT_LOADING': 'SET_DISCOUNT_LOADING',
  'SET_DISCOUNTS': 'SET_DISCOUNTS',
}

export interface DiscountItem {
  charges: number;
  company: string;
  customer?: {
    _id: string;
    profile: {
      displayName: string;
    }
  }
  description: string;
  isActive: boolean;
  isDiscountItem: boolean;
  isFixed: boolean;
  isJobType: boolean;
  name: string;
  noOfItems: number;
  tax: number;
  _id: string;
}

export interface DiscountState {
  readonly isLoading: boolean;
  readonly discountItems: DiscountItem[];
}
