import request from '../utils/http.service';

export const generateIncomeReport = async (params: any) => {
  try {
    const response: any = await request("/generateIncomeReport", 'OPTIONS', params);
    const {status, message} = response.data;
    if (status === 1) {
      return response.data;
    } else {
      return {status, message};
    }
  } catch {
    return {status: 0, message: `Something went wrong`};
  }
}