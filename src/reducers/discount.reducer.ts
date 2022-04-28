
import { DiscountItemActionTypes, DiscountState } from 'actions/discount/discount.types';
import { Reducer } from 'redux';


const initialState: DiscountState = {
  'isLoading': false,
  'discountItems': [],
};

export const DiscountItemsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case DiscountItemActionTypes.SET_DISCOUNT_LOADING:
      return {
        ...state,
        'isLoading': action.payload
      };
    case DiscountItemActionTypes.SET_DISCOUNTS:
      return {
        ...state,
        'discountItems': action.payload,
      };
    default:
      return state;
  }
};
