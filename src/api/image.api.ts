import request from "utils/http.service";

export const upload = async (data: FormData) => {
  let responseData;
  try {
    const response: any = await request("/uploadImage", "POST", data, false);
    responseData = response.data;
    
  } catch (err:any) {
    responseData = { message: '' };
    responseData.message = 'We are facing some issues, please try again.'
  }
  return responseData;
}
