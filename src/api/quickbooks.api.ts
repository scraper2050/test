import request from "utils/http.service";

export const quickbooksQync = async () => {
  try {
    const response: any = await request("/syncQBCustomers", "POST", null, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};
