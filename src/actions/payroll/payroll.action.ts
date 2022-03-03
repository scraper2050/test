import {PayrollActionType, types} from './payroll.types';


import {getContractorsAPI, updateCommissionAPI} from 'api/payroll.api';
import { Contractor } from './payroll.types';
import {error} from "../snackbar/snackbar.action";


export const setContractorsLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_CONTRACTOR_LOADING
  };
};

export const getContractors = () => {
  return async (dispatch: any) => {
    dispatch(setContractorsLoading(true));
    const contractors: any = await getContractorsAPI();
    if (contractors.status === 0) {
      dispatch(error(contractors.message));
      dispatch(setContractors([]));
      dispatch(setContractorsLoading(false));
    } else {
      dispatch(setContractors(contractors.data));
    }
  };
};

/*export const updateCommission = (params: {
  type: string;
  id: string;
  commission: number;
}) => {
  return async (dispatch: any) => {
    const contractor: any = await updateCommissionAPI(params);
    if (contractor.status === 0) {
      dispatch(error(contractor.message));
    } else {
      dispatch(setContractors(contractor.data));
    }
  };
};*/

export const setContractors = (contractors: any) => {
  return {
    'type': types.SET_CONTRACTORS,
    'payload': contractors,
  };
};

export const setContractor = (contractor: any) => {
  console.log('ffffffffffff')
  return {
    'type': types.SET_CONTRACTOR,
    'payload': contractor
  };
};



