import request from '../utils/http.service';
import {
  refreshContacts,
  setContactsLoading,
  setContacts,
} from '../actions/contacts/contacts.action';

export const getContacts = (data: any) => {

  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setContactsLoading(true));
      request('/getContacts', 'OPTIONS', data, false)
        .then((res: any) => {
          console.log(data, 'saapi');
          dispatch(setContactsLoading(false));
          return resolve(res.data)
        })
        .catch((err) => {
          dispatch(setContactsLoading(false));
          return reject(err);
        });
    });
  }
}