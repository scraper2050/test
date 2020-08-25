import { apiUrls } from "consts";
import Config from 'Config';

export const getJobTypes = async (param:{}) => {

  const body = {
    includeActive: "true",
    includeNonActive: "false"
  };

  const response = await fetch(Config.apiBaseURL + apiUrls.getJobTypes, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("token") as string,
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
  return data.types;
};