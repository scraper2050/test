import request from 'utils/http.service';

export const getCompanyContracts = async () => {
  let responseData = null;
  try {
    const response: any = await request('/getCompanyContracts', 'POST', {}, false);
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
  };
  responseData = responseData.status === 0 ? [] : responseData.contracts;
  return responseData;
};

export const getContractorDetail = async (data: any) => {
  const body = {
    contractorId: data
  };
  let responseData;
  try {
    const response: any = await request("/getContractorDetail", "POST", body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(
        err.data.errors ||
        err.data.message ||
        `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData.details;
};

export const callSearchVendorAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/searchContractor`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
export const callAddVendorAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/startContract`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
export const callInviteVendarAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/inviteContractor`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
