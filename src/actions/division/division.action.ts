import { getDivision as fetchDivision } from 'api/division.api';
import { DivisionActionType } from './division.types';

export const loadingDivision = () => {
   return {
      type: DivisionActionType.GET
   }
}

export const getDivision = (id: string) => {
   return async (dispatch: any) => {
      const divisions: any = await fetchDivision(id);
      dispatch(setDivision(divisions));
   };
}

export const refreshDeisions = (refresh: boolean) => {
   return (dispatch: any) => {
      dispatch(setDivisionsRefresh(refresh));
   };
}

export const setDivision = (divisions: any) => {
   return {
      type: DivisionActionType.SET,
      payload: divisions
   }
}

export const setDivisionsRefresh = (refresh: boolean) => {
   return {
      type: DivisionActionType.REFRESH,
      refresh: refresh
   }
}