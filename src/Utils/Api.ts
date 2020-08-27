import Axios from 'axios';
import Config from '../Config';

export default Axios.create({
  'baseURL': Config.apiBaseURL,
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
