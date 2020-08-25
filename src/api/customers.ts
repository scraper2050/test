import { apiUrls } from "consts";
import Config from 'Config';

export const getCustomers = async (param:{}) => {

  const body = {
    includeActive: "true",
    includeNonActive: "false"
  };

  const response = await fetch(Config.apiBaseURL + apiUrls.getCustomers, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(
      data.errors ||
      data.message
    );
  }
  return data;
};