import {types} from './payroll.types';
import {getContractorsAPI, getPaymentsByContractorAPI} from 'api/payroll.api';
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

export const getContractorPayments = (params: {type: string; id: string}) => {
  return async (dispatch: any) => {
    dispatch(setContractorsLoading(true));
    const payments: any = await getPaymentsByContractorAPI(params.type, params.id);
    if (payments.status === 0) {
      dispatch(error(payments.message));
    } else {
      dispatch(setContractorPayments(payments.payment));
    }
    dispatch(setContractorsLoading(false));
  };
};

export const setContractors = (contractors: any) => {
  return {
    'type': types.SET_CONTRACTORS,
    'payload': contractors,
  };
};

export const setContractor = (contractor: any) => {
  return {
    'type': types.SET_CONTRACTOR,
    'payload': contractor
  };
};

export const setContractorPayments = (payments: any) => {
  return {
    'type': types.SET_CONTRACTOR_PAYMENTS,
    'payload': payments
  };
};



