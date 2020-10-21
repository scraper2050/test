import { BrandsActionType, BrandsState } from './../actions/brands/brands.types';
import { Reducer } from 'redux';

const initialBrands: BrandsState = {
	loading: false,
	data: []
}

export const BrandsReducer: Reducer<any> = (state = initialBrands, action) => {
	switch (action.type) {
		case BrandsActionType.GET:
			return {
				loading: true,
				data: initialBrands,
			};
		case BrandsActionType.SUCCESS:
			return {
				loading: false,
				data: [...action.payload],
			}
		case BrandsActionType.SET:
			return {
				loading: false,
				data: [...action.payload],
			}
		case BrandsActionType.FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
	}
	return state;
}

