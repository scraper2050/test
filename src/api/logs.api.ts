import { Logs } from 'actions/invoicing/logs/logs.types';
import request from 'utils/http.service';


export const getLogs = async (data:any) => {
  try {
    const requestObj:any = {}
    if(data)
    {
      requestObj.invoice = data;

    }
    const response: any = await request('/getInvoiceLogs', 'POST', requestObj);
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
