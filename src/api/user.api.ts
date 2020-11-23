import request from "utils/http.service";

export const updateCompanyProfile = async (data: any) => {
  let responseData;
  try {
    const response: any = await request("/updateCompanyProfile", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { ErrMsg: '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.ErrMsg = 'We are facing some issues, please try again.'
    } else {
      responseData.ErrMsg = 'Something went wrong'
    }
  }
  console.log(responseData);
  return responseData;
}
