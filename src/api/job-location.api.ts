import request from 'utils/http.service';

export const createJobLocation = async (data: any) => {
  let responseData;
  try {
    const response: any = await request('/jobLocation', 'POST', data, false);
    responseData = response.data;
  } catch (err){
    responseData = { 'status': 0,
      'message': '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.message = 'We are facing some issues, please try again.';
    } else {
      responseData.message = 'Something went wrong';
    }
  }
  return responseData;
};


export const getJobLocations = async (data: any) => {
  const { customerId, isActive = 'ALL' } = data;
  let responseData;
  try {
    const response: any = await request(`/jobLocation?customerId=${customerId}&isActive=${isActive}`, 'GET', {}, false);
    responseData = response.data;
  } catch (err){
    responseData = { 'status': 0,
      'message': '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.message = 'We are facing some issues, please try again.';
    } else {
      responseData.message = 'Something went wrong';
    }
  }
  return responseData;
};


export const getJobLocation = async (id: string) => {
  try {
    const response: any = await request(`/jobLocation/${id}`, 'GET', {}, false);
    return response.data;
  } catch (err){
    const responseData = { 'msg': '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.msg = 'We are facing some issues, please try again.';
    } else {
      responseData.msg = 'Something went wrong';
    }
    return responseData;
  }
};

export const updateJobLocation = async (data: any) => {
  const { 'jobLocationId': id } = data;
  delete data.id;
  try {
    const response: any = await request(`/jobLocation/${id}`, 'PUT', data, false);
    return response.data;
  } catch (err){
    const responseData = { 'status': 0,
      'message': '' };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.message = 'We are facing some issues, please try again.';
    } else {
      responseData.message = 'Something went wrong';
    }
    return responseData;
  }
};


export const getSubdivision = async (
  customerId?: string,
  builderId?: string,
  isActive: string = 'ALL',
  keyword: string = ''
) => {
  try {
    const queryParams = new URLSearchParams({
      isActive,
      keyword
    });

    if (customerId) {
      queryParams.append('customerId', customerId);
    }
    if (builderId) {
      queryParams.append('builderId', builderId);
    }

    const url = `/jobLocation/name?${queryParams.toString()}`;
    const response = await request(url, 'GET', {}, false);

    // Access jobLocations from the response data
    return response.data.jobLocations || [];
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};
                                          