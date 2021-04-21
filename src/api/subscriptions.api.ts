import request from '../utils/http.service';

export const getAllSubscriptions = async () => {
  try {
    const response:any = await request(`/getAllSubscriptions`, 'GET', false);
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
