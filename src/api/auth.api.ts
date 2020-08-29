import Config from 'Config';
import { apiUrls } from 'Utils/Constants';
// Import Sha256 from "../components/common/sha256";

const login = async (param: { email: string, password: string }) => {
  const body = {
    'email': param.email,
    'password': param.password
    // Password: Sha256.hash(param.password),
  };

  const response = await fetch(
    Config.apiBaseURL + apiUrls.login,
    {
      'body': JSON.stringify(body),
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'method': 'POST'
    }
  );

  const data = await response.json();
  /*
   * Console.log(response);
   * console.log(data);
   */

  if (response.status >= 400 || data.status === 0) {
    throw new Error(data.errors ||
      data.message ||
      `${data['err.user.incorrect']}\nYou have ${data.retry} attempts left`);
  }
  return {
    'token': data.token,
    'user': data.user
  };
};

export { login };
