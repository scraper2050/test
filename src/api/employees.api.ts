import Config from 'Config';
import { apiUrls } from 'Utils/Constants';

export const getAllEmployees = async (param: {}) => {
  const response = await fetch(
    Config.apiBaseURL + apiUrls.getCustomers,
    {
      'body': JSON.stringify(param),
      'headers': {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token') as string,
        'Content-Type': 'application/json'
      },
      'method': 'POST'
    }
  );

  const data = await response.json();

  if (response.status >= 400 || data.status === 0) {
    throw new Error(data.errors ||
      data.message);
  }
  return data.users;
};
