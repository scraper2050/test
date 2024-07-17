import request from "utils/http.service";

export const getCompaniesAutoComplete = async (keyword: string) => {
  let responseData = [];
  try {
    const response: any = await request(
      `/companies/name?keyword=${keyword}`,
      "GET"
    );
    responseData = response.data.companies;
  } catch (err) {
    responseData = (err as any).data;
    if ((err as any).response.status >= 400 || (err as any).data.status === 0) {
      throw new Error(
        (err as any).data.errors ||
        (err as any).data.message ||
        `${(err as any).data["err.user.incorrect"]}\nYou have ${(err as any).data.retry
        } attempts left`
      );
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};

export const getCompanyDetail = async (companyId: string) => {
  let responseData;
  try {
    const response: any = await request(
      `/companies/${companyId}`,
      "GET"
    );
    responseData = response.data.company;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};
