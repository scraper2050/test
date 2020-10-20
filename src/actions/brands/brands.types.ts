export interface BrandsState {
	readonly loading: boolean
	readonly data?: any[]
	readonly error?: string
}

export enum BrandsActionType {
	GET = 'getBrands',
	SET = 'setBrands',
	SUCCESS = 'getBrandsSuccess',
	FAILED = 'getBrandsFailed',
}