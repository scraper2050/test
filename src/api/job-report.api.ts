import request from 'utils/http.service';

export const getJobReports = async (data: any) => {
  try {
    const response: any = await request('/getAllJobReports', 'GET', false);
    return response.data;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
          err.data.message ||
          `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

export const getJobReportDetail = async (data: any) => {
  const body = {
    'jobReportId': data.id
  };
  let responseData = {};
  try {
    const response: any = await request('/getJobReport', 'GET', body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
          err.data.message ||
          `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};

// Export const getJobReportDetail = async (data: any) => {};
