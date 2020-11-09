import request from "utils/http.service";

export const getJobSites = async (data: any) => {
  const customerId = data;
  let responseData;
  try {
    const response: any = await request(`/jobSite?customerId=${customerId}`, "GET", {}, false);
    responseData = response.data;
  } catch (err) {
    responseData = { msg: '' };
    if (err.response.status >= 400 || err.response.status === 0) {

      responseData.msg = 'We are facing some issues, please try again.'

    } else {
      responseData.msg = 'Something went wrong'
    }
  }
  return responseData;
};





