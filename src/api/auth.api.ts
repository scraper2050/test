import { apiUrls } from "Utils/Constants";
import Config from 'Config';
// import Sha256 from "../components/common/sha256";

const login = async (param: { email: string, password: string }) => {

  const body = {
    email: param.email,
    password: param.password,
    // password: Sha256.hash(param.password),
  };

  const response = await fetch(Config.apiBaseURL + apiUrls.login, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  // console.log(response);
  // console.log(data);

  if (response.status >= 400 || data.status === 0) {
    throw new Error(
      data.errors ||
      data.message ||
      data["err.user.incorrect"] + `\nYou have ${data.retry} attempts left`
    );
  }
  return {
    token: data.token,
    user: data.user,
  };
};

export { login };
