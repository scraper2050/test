import request from "utils/http.service";

export const getEmailDefault = async () => {
  try {
    const response: any = await request("/getCompanyEmailDefault", "GET", {}, false);
    return response;
  } catch (err) {
    console.log(err)
    throw new Error(`Something went wrong`);
  }
};
