import request from "utils/http.service";

export const getBrands = async (param?: {}) => {
  const body = {
    includeActive: "true",
    includeNonActive: "false",
  };
  let responseData;
  try {
    const response: any = await request("/getEquipmentBrands", "POST", body, false);
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
  return responseData.brands;
};

export const saveBrandType = async (body: { title: string }) => {
  let responseData;
  try {
    const response: any = await request("/createEquipmentBrand", "POST", body, false);
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
  return responseData;
};
