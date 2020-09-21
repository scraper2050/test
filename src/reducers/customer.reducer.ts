import { Reducer } from 'redux';
import { CustomersState, CustomersActionType, types } from './../actions/customer/customer.types';

const initialCustomers: CustomersState = {
	loading: false,
	data: []
}

export const CustomersReducer: Reducer<any> = (state = initialCustomers, action) => {
	switch (action.type) {
		case CustomersActionType.GET:
			return {
				loading: true,
				data: initialCustomers,
			};
		case CustomersActionType.SUCCESS:
			return {
				loading: false,
				data: [...action.payload],
			}
		case types.SET_CUSTOMERS:
			return {
				loading: false,
				data: [...action.payload],
			}
		case CustomersActionType.FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
	}
	return state;
}
