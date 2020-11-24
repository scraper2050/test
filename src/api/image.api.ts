import request from "utils/http.service";

export const upload = async (data: any) => {
  let responseData;
  try {
    const response: any = await request("/uploadImage", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { message: '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.message = 'We are facing some issues, please try again.'

    } else {
      responseData.message = 'Something went wrong.'
    }
  }
  return responseData;
}
