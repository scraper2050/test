import request from "utils/http.service";

export const updateEmployeeEmailPreferences = async (data: any) => {
  let responseData;

  try {
    const response: any = await request("/updateEmployeeEmailPreferences", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { message: '' };
    responseData.message = 'We are facing some issues, please try again.'
  }

  return responseData;
}