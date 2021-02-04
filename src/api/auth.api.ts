import request from "utils/http.service";
import { Auth, AuthInfo } from "app/models/user";

const login = async (param: Auth) => {
  let loginData: AuthInfo = {
    token: null,
    user: null,
  };

  try {
    const response: any = await request("/login", "POST", param, false);
    loginData = response.data;
  } catch (err) {
    loginData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(
        err.data.errors ||
        err.data.message ||
        `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {
      throw new Error(`Something went wrong`);
    }
  }

  return loginData;
};

export { login };
