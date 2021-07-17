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
};

export const getQBAuthStateFromLocalStorage = () => {
  return (localStorage.getItem('qb_auth') === 'true');
}

export const setQBAuthStateToLocalStorage = (state: boolean) => {
  localStorage.setItem(
    'qb_auth',
    state.toString()
  );
}


