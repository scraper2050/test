import request from "utils/http.service";
import { CompanyProfile } from '../actions/user/user.types'

export const updateCompanyProfile = async (data: CompanyProfile) => {
  let responseData;
  try {
    const response: any = await request("/updateCompanyProfile", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { message: '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.message = 'We are facing some issues, please try again.'
    } else {
      responseData.message = 'Something went wrong'
    }
  }
  console.log(responseData);
  return responseData;
}
