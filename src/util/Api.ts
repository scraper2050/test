import Axios from 'axios';
import Config from '../Config';

export default Axios.create({
  baseURL: Config.apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});
