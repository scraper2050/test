import request from '../utils/http.service';

export const getCurrentInvoiceNumber = () => {
  return new Promise((resolve, reject) => {
    request('/getCurrentInvoiceNumber', 'POST', {}, false)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const setCustomInvoiceNumber = (data: any):any => {
  return new Promise((resolve, reject) => {
    request(`/setCustomInvoiceNumber`, 'POST', data, false)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};