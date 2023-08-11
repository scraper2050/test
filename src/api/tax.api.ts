import request from '../utils/http.service';
import { refreshSalesTax, setSalesTax, setSalesTaxLoading } from 'actions/tax/tax.action';

export const getAllSalesTaxAPI: any = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setSalesTaxLoading(true));
      request(`/getSalesTax`, 'post', null)
        .then((res: any) => {
          dispatch(setSalesTax(res.data.taxes));
          dispatch(setSalesTaxLoading(false));
          dispatch(refreshSalesTax(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setSalesTaxLoading(false));
          return reject(err);
        });
    });
  };
};


export interface SalesTaxProps {
  id?: string;
  state: string;
  tax: number;
}

export const createSalesTax = async ({ state, tax }:SalesTaxProps) => {
  try {
    const response: any = await request(`/createSalesTax`, 'POST', { state,
      tax }, false);
    return response.data;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
          err.data.message ||
          `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};


export const updateSalesTax = async ({ id, state, tax }:SalesTaxProps) => {
  try {
    const response: any = await request(`/updateSalesTax`, 'POST', { 'salesTaxId': id,
      state,
      tax }, false);
    return response.data;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
          err.data.message ||
          `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

