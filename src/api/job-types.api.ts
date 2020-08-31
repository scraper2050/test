import Config from 'config';
import { apiUrls } from 'utils/constants';

export const getJobTypes = async (param:{}) => {
  const body = {
    'includeActive': 'true',
    'includeNonActive': 'false'
  };

  const response = await fetch(
    Config.apiBaseURL + apiUrls.getJobTypes,
    {
      'body': JSON.stringify(body),
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
  return data.types;
};
