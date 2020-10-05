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

