import request from '../utils/http.service';

const login = async (param: { email: string, password: string }) => {
  const body = {
    'email': param.email,
    'password': param.password
  };
  let loginData = {
    'token': null,
    'user': null
  };
  try {
    const response: any = await request('/login', 'POST', body, false);
    loginData = response.data;
  } catch (err) {
    loginData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return {
    'token': loginData.token,
    'user': loginData.user
  };
};

export { login };
