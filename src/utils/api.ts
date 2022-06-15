import Axios from 'axios';
import config from '../config';

export default Axios.create({
  'baseURL': config.apiBaseURL,
  'headers': {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
});

export const setToken = (token: string): void => {
  localStorage.setItem(
    'token',
    token
  );
};
export const setTokenCustomerAPI = (tokenCustomerAPI: string): void => {
  localStorage.setItem(
    'tokenCustomerAPI',
    tokenCustomerAPI
  );
};
export const setUser = (user: any): void => {
  localStorage.setItem(
    'user',
    user
  );
};
