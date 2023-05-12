import config from 'config';
import { getLocalStorageToken } from './local-storage.service';
import axios, { AxiosRequestConfig, Method, CancelTokenSource } from 'axios';

const api = config.apiBaseURL;
const customerApi = config.apiCustomerURL;

const fetchToken = (isCustomerAPI = false) => {
  if(isCustomerAPI){
    return localStorage.getItem('tokenCustomerAPI') || '';
  }
  let token = '';
  if (getLocalStorageToken()) {
    token = getLocalStorageToken();
  }
  return token;
};

export default (url: string, type: Method, data?: any, noHeaders?: boolean, enctype = "", cancelTokenSource?: CancelTokenSource, isCustomerAPI = false, queryParams?: any) => new Promise((resolve, reject) => {
  let token = '';

  if (!noHeaders) {
    token = fetchToken(isCustomerAPI);
  }
  const request: AxiosRequestConfig = {
    'headers': {},
    'method': type === "OPTIONS" ? "get" : type,
    'url': isCustomerAPI ? customerApi + url : api + url
  };
  if (type !== 'get') {
    if (type === "OPTIONS") {
      request.params = data
    } else {
      request.data = data;
    }
  }
  if (!noHeaders) {
    request.headers = {
      ...request.headers,
      'Authorization': token,
    };
  }
  if(cancelTokenSource){
    request.cancelToken = cancelTokenSource.token
  }

  //add current division params
  if (queryParams) {
    try {
      request.params = {...request.params, ...queryParams};
    } catch (error) {}
  }

  axios(request)
    .then(res => {
      if(res?.data?.status === 0 && res?.data?.message === 'Session is expired or you are already logged out, please login again') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenCustomerAPI');
        window.location.href = '/'
      } else {
        return resolve(res);
      }
    })
    .catch(err => {
      return reject(err);
    });
});
