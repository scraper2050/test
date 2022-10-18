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

export const getMemorizedReports = async () => {
  try {
    const response: any = await request("/getMemorizedReports", 'OPTIONS');
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

export const updateMemorizedReport = async (params: any) => {
  try {
    const response: any = await request("/updateMemorizedReport", 'PUT', params);
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

export const createMemorizedReport = async (params: any) => {
  try {
    const response: any = await request("/createMemorizedReport", 'POST', params);
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

export const generateAccountReceivableReport = async (type: number, asOf: string) => {
  const params = `?reportData=${type}&asOf=${asOf}`
  try {
    const response: any = await request(`/generateAccountReceivableReport${params}`, 'GET', {});
    return response.data;
  } catch {
    return {status: 0, message: `Something went wrong`};
  }
}
