import { getTechnicians as fetchTechnicians } from 'api/technicians.api';
import { TechniciansActionType } from './technicians.types';

export const loadingTechnicians = () => {
	return {
		type: TechniciansActionType.GET
	}
}

export const getTechnicians = () => {
	return async (dispatch: any) => {
		const technicians: any = await fetchTechnicians();
		dispatch(Technicians(technicians));
	};
}

export const Technicians = (technicians: any) => {
	return {
		type: TechniciansActionType.SET,
		payload: technicians
	}
}