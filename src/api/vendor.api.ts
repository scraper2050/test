import request from 'utils/http.service';
import {normalizeData} from "./payroll.api";
import {ContractorPayment} from "../actions/payroll/payroll.types";

export const getCompanyContracts = async (filter?: any) => {
  let body: any = {};
  if (filter?.workType && filter?.companyLocation) {
    body["workType"] = filter.workType;
    body["companyLocation"] = filter.companyLocation;
  }

  let responseData = null;
  try {
    const response: any = await request('/getCompanyContracts', 'POST', body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(`Something went wrong`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  responseData = responseData.status === 0 ? [] : responseData.contracts;
  return responseData;
};

export const getContractorDetail = async (data: any, type: string = 'vendor') => {
  const body = {
    type,
    contractorId: type === 'vendor' ? data : undefined,
    employeeId: type === 'vendor' ? undefined : data,
  };
  let responseData;
  try {
    const response: any = await request('/getContractorDetail', 'POST', body, false);
    const {details, payments} = response.data;
    responseData = {
      details,
      payments: payments.map((payment: ContractorPayment) => ({
        ...payment,
        payedPerson: normalizeData(payment.contractor, 'contractor'),
        contractor: undefined,
        })
      )
    }
  } catch (err) {
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


export interface AcceptRejectContractProps {
  contractId: string;
  status: string;
}

export const acceptRejectVendorAPI = ({ contractId, status }:AcceptRejectContractProps) => {
  return new Promise((resolve, reject) => {
    request(`/acceptOrRejectContract`, 'post', { contractId,
      status })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const finishVendorApi = ({ contractId }:AcceptRejectContractProps) => {
  return new Promise((resolve, reject) => {
    request(`/finishContract`, 'post', { contractId })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const remindVendorApi = ({ contractId }:AcceptRejectContractProps) => {
  return new Promise((resolve, reject) => {
    request(`/remindContractor`, 'post', { contractId })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};


