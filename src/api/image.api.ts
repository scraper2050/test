import request from "utils/http.service";

export const upload = async (data: any) => {
  let responseData;
  try {
    const response: any = await request("/uploadImage", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { ErrMsg: '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.ErrMsg = 'We are facing some issues, please try again.'

    } else {
      responseData.ErrMsg = 'Something went wrong'
    }
  }
  return responseData;
}
