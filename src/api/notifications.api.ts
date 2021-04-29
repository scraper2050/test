import request from 'utils/http.service';

export const getNotifications = async () => {
  try {
    const response: any = await request('/getNotifications', 'GET', false);
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


export const updateNotification = async ({ id, isRead = true, isDismissed = false }:any) => {
  try {
    const response: any = await request(`/updateNotification/${id}`, 'PUT', {
      'isDismissed': isDismissed,
      'isRead': isRead

    }, false);
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
