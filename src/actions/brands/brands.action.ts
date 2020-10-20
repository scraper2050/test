import { getBrands as fetchBrands } from 'api/brands.api';
import { BrandsActionType } from './brands.types';

export const loadingBrands = () => {
	return {
		type: BrandsActionType.GET
	}
}

export const getBrands = () => {
	return async (dispatch: any) => {
		const brands: any = await fetchBrands();
		dispatch(setBrands(brands));
	};
}

export const setBrands = (brands: any) => {
	return {
		type: BrandsActionType.SET,
		payload: brands
	}
}