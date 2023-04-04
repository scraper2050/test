import request from 'utils/http.service';
import { setDiscountLoading, setDiscounts } from 'actions/discount/discount.action';

export const updateDiscount = async (item:any) => {
  try {
    const response: any = await request('/updateDiscountItem', 'PUT', item, false);
    if(response.data.status === 0){
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

export const addDiscount = async (item:any) => {
  try {
    const response: any = await request('/createDiscountItem', 'POST', item, false);
    if(response.data.status === 0){
      throw new Error(response.data.message)
    }
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

export const getAllDiscountItemsAPI = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setDiscountLoading(true));
      request(`/getDiscountItems`, 'OPTIONS', {})
        .then((res: any) => {

          dispatch(setDiscounts(res?.data?.discountItems?.reverse() || []));
          dispatch(setDiscountLoading(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setDiscountLoading(false));
          return reject(err);
        });
    });
  };
};

