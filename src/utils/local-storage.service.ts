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

