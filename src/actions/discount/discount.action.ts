import { DiscountItemActionTypes, DiscountItem } from './discount.types';

export const setDiscountLoading = (isLoading: boolean) => {
  return {
    'payload': isLoading,
    'type': DiscountItemActionTypes.SET_DISCOUNT_LOADING
  };
};

export const setDiscounts = (discountItems: DiscountItem[]) => {
  return {
    'payload': discountItems,
    'type': DiscountItemActionTypes.SET_DISCOUNTS
  };
};