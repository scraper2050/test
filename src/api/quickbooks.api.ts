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
  const url = `/QBCallback?${data.data}&redirectUri=${data.redirectUri}`
  console.log (url)
  try {
    const response: any = await request(url, "GET", null, false);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(`Something went wrong`);
  }
};

export const quickbooksCustomerSync = async () => {
  console.log('ffffffffffffffffffff')
  try {
    const response: any = await request("/syncQBCustomers", "POST", null, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};


export const quickbooksItemsSync = async () => {
  console.log('ssssssssssssssssss')
  try {
    const response: any = await request("/syncQBItems", "POST", null, false);
    console.log(response)
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};

