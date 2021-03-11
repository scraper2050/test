import request from "utils/http.service";

export const getCustomers = async (param?: {}) => {
  const body = {
    includeActive: "true",
    includeNonActive: "false",
  };
  let responseData;
  try {
    const response: any = await request("/getCustomers", "POST", body, false);

    responseData = response.data;
    if (response.status === 200) {

      responseData = {
        ...response.data,
        customers: response.data.customers.sort((a: any, b: any) => (a.profile.displayName > b.profile.displayName) ? 1 : ((b.profile.displayName > a.profile.displayName) ? -1 : 0))
      }
    }
  } catch (err) {
    responseData = err.data;
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
  return responseData;
};

export const getCustomerDetail = async (data: any) => {
  const body = {
    customerId: data.customerId,
    companyId: data.companyId,
  };
  let responseData;
  try {
    const response: any = await request(
      "/getCustomerDetail",
      "POST",
      body,
      false
    );
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
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
  return responseData.customer;
};

export const updateCustomers = async (data: any) => {
  const body = {
    includeActive: "true",
    includeNonActive: "false",
  };
  let responseData;
  try {
    const response: any = await request("/updateCustomer", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { msg: "" };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.msg = "We are facing some issues, please try again.";
    } else {
      responseData.msg = "Something went wrong";
    }
  }
  return responseData;
};

export const createCustomer = async (data: any) => {
  let responseData;
  try {
    const response: any = await request("/createCustomer", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    responseData = { msg: "" };
    if (err.response.status >= 400 || err.response.status === 0) {
      responseData.msg = "We are facing some issues, please try again.";
    } else {
      responseData.msg = "Something went wrong";
    }
  }
  return responseData;
};
