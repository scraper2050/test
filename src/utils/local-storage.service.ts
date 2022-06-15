import {QuickbooksState} from "../reducers/quickbooks.reducer";

export const getLocalStorageToken = () => {
  return localStorage.getItem('token') || '';
};

export const setUserToLocalStorage = (user: any, token: string) => {
  localStorage.setItem(
    'user',
    JSON.stringify(user)
  );
  localStorage.setItem(
    'token',
    token
  );
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenCustomerAPI');
};

export const getQBAuthStateFromLocalStorage = () => {
  const qb_auth = localStorage.getItem('qb_auth');
  if (qb_auth === 'true'){
    return {qbAuthorized: true};
  }
  if (qb_auth) {
    return JSON.parse(qb_auth);
  } else {
    return null;
  }
}

export const setQBAuthStateToLocalStorage = (state: QuickbooksState) => {
  localStorage.setItem(
    'qb_auth',
    JSON.stringify(state),
  );
}

export const removeQBAuthStateLocalStorage = () => {
  localStorage.removeItem('qb_auth');
};


