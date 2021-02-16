import config from 'config';
import { getLocalStorageToken } from './local-storage.service';
import axios, { AxiosRequestConfig, Method } from 'axios';

const api = config.apiBaseURL;

const fetchToken = () => {
  let token = '';
  if (getLocalStorageToken()) {
    token = getLocalStorageToken();
  }
  return token;
};

export default (url: string, type: Method, data?: any, noHeaders?: boolean, enctype = "") => new Promise((resolve, reject) => {
  let token = '';

  if (!noHeaders) {
    token = fetchToken();
  }
  const request: AxiosRequestConfig = {
    'headers': {},
    'method': type === "OPTIONS" ? "get" : type,
    'url': api + url
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
  axios(request)
    .then(res => {
      return resolve(res);
    })
    .catch(err => {
      return reject(err);
    });
});
