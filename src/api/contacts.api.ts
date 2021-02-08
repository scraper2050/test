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
        .then(async (res: any) => {
          try {
            await dispatch(setContacts(res.data.result));
            await dispatch(setContactsLoading(false));
            return resolve(res.data)
          } catch {
            await dispatch(setContacts([]));
            return reject(res.message);
          }
        })
        .catch(async (err) => {
          await dispatch(setContacts([]));
          await dispatch(setContactsLoading(false));
          return reject(err);
        });
    });
  }
}

export const addContact = (data: any) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setContactsLoading(true));
      dispatch(refreshContacts(false));
      request(`/addContact`, 'POST', data, false)
        .then(async (res: any) => {
          await dispatch(setContactsLoading(false));
          await dispatch(refreshContacts(true));
          return resolve(res.data)
        })
        .catch((err) => {
          dispatch(setContactsLoading(false));
          return reject(err);
        });
    })
  }
}

export const updateContact = (data: any) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setContactsLoading(true));
      dispatch(refreshContacts(false));
      request(`/updateContact`, 'PUT', data, false)
        .then(async (res: any) => {
          await dispatch(setContactsLoading(false));
          await dispatch(refreshContacts(true));
          return resolve(res.data)
        })
        .catch((err) => {
          dispatch(setContactsLoading(false));
          return reject(err);
        });
    })
  }
}


export const removeContact = (data: any) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setContactsLoading(true));
      dispatch(refreshContacts(false));
      request(`/removeContact`, 'DELETE', data, false)
        .then(async (res: any) => {
          await dispatch(setContactsLoading(false));
          await dispatch(refreshContacts(true));
          return resolve(res.data)
        })
        .catch((err) => {
          dispatch(setContactsLoading(false));
          return reject(err);
        });
    })
  }
}