import request from '../utils/http.service';
import {sortByField} from "../utils/sort";

export const getContractorsAPI = async () => {
  try {
    const response: any = await request("/getContractors", 'GET', {}, false);
    const {status, message, contractors = [], technicians = []} = response.data;
    if (status === 1) {
      const data = [
          ...contractors.map((contractor: any) => normalizeData(contractor, 'vendor')),
          ...technicians.map((technician: any) => normalizeData(technician, 'employee')),
      ];
      return {data: sortByField(data, 'vendor','asc',false), status};
    } else {
      return {status, message};
    }
  } catch {
    return {status: 0, message: `Something went wrong`};
  }
}

export const updateCommissionAPI = async (params: {
  type: string;
  id: string;
  commission: number;
}) => {
  try {
    const response: any = await request("/updateCommission", 'PUT', params, false);
    const {status, message, contractor, employee} = response.data;
    if (status === 1) {
      const data = (contractor ? normalizeData(contractor, 'vendor') : normalizeData(employee, 'employee'));
      return {data, status, message};
    } else {
      return {status, message};
    }
  } catch {
    return {status: 0, message: `Something went wrong`};
  }
}

const normalizeData = (item: any, type: string) => {
  switch (type) {
    case 'vendor':
    case 'contractor':
      return ({
        vendor: item.info.companyName,
          email: item.info.companyEmail,
        phone: item.contact?.phone || '',
        address: item.address,
        contact: '',
        commission: item.commission,
        balance: item.balance,
        _id: item._id,
        type: 'vendor'});
    case 'employee':
    case 'technician':
      return ({
        vendor: item.profile.displayName,
        email: item.auth.email,
        phone: item.contact?.phone || '',
        address: item.address,
        contact: '',
        commission: item.commission,
        balance: item.balance,
        _id: item._id,
        type: 'employee'});
  }
}
