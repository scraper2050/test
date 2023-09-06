import request from "utils/http.service";

export const quickbooksGetUri = async (data: any) => {
  try {
    const response: any = await request("/getQBUri", "POST", data, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};

export const quickbooksAuthenticate = async (data: any) => {
  const url = `/QBCallback?${data.data}&redirectUri=${data.redirectUri}`;
  try {
    const response: any = await request(url, "GET", null, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};

export const quickbooksCustomerSync = async () => {
  try {
    const response: any = await request("/syncQBCustomers", "POST", null, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};
export const quickbooksItemSync = async (data:any) => {
  try {
    const response: any = await request("/syncQBItem", "POST", data, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};
export const quickbooksGetAccounts = async () => {
  try {
    const response: any = await request("/getQBAccounts", "POST",{}, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};

export const quickbooksItemsSync = async () => {
  try {
    const response: any = await request("/syncQBItems", "POST", null, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};

export const quickbooksInvoicesSync = async () => {
  try {
    const response: any = await request("/syncQBInvoices", "POST", null, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};

export const quickbooksDisconnect = async () => {
  try {
    const response: any = await request("/disconnectQB", "POST", null, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};

