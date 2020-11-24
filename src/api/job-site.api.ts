import request from "utils/http.service";

export const getJobSites = async (data: any) => {
  let responseData;
  try {
    const response: any = await request(`/jobSite?customerId=${data.customerId}&locationId=${data.locationId}`, "GET", {}, false);
    responseData = response.data;
  } catch (err) {
    responseData = { msg: ''};
    if (err.response.status >= 400 || err.response.status === 0) {
     
      responseData.msg = 'We are facing some issues, please try again.'
      
    } else {
      responseData.msg = 'Something went wrong'
    }
  }
  return responseData;
};

export const createJobSite = async (data: any) => {

  let responseData;
  try {
    const response: any = await request('/jobSite', "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { msg: ''};
    if (err.response.status >= 400 || err.response.status === 0) {
     
      responseData.msg = 'We are facing some issues, please try again.'
      
    } else {
      responseData.msg = 'Something went wrong'
    }
  }
  return responseData;
};

export const updateJobSite = async (data: any) => {
  let responseData;
  try {
    const response: any = await request(`/jobSite/${data.jobSiteId}`, "PUT", data, false);
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
