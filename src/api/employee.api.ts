import { UserProfile } from "actions/employee/employee.types";
import request from "utils/http.service";

export const getEmployeesForJob = async () => {
  let responseData;
  try {
    const response: any = await request("/getEmployeesForJob", "POST", {}, false);
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

export const getEmployees = async () => {
  let responseData;
  try {
    const response: any = await request("/getAllEmployees", "POST", null, false);
    responseData = response.data;
  } catch (err) {
    /*responseData = err.data;
    console.log(err);
    if (err.response.status >= 400 || (!responseData && responseData.status === 0)) {
      throw new Error(
        err.data.errors ||
        err.data.message ||
        `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {*/
    throw new Error(`Something went wrong`);
    //}
  }
  return responseData.employees;
};

export const getEmployeeDetail = async (data: any) => {
  const body = {
    employeeId: data
  }
  let responseData;

  try {
    const response: any = await request("/getEmployeeDetail", "OPTIONS", body, false);
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

}


export const addTechnician = async (data: UserProfile) => {
  let responseData;
  try {
    const response: any = await request("/createTechnician", "POST", data, false);
    responseData = response.data;
    console.log(responseData);
  } catch (err) {
    /*responseData = err.data;
    console.log(err);
    if (err.response.status >= 400 || (!responseData && responseData.status === 0)) {
      throw new Error(
        err.data.errors ||
        err.data.message ||
        `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {*/
    throw new Error(`Something went wrong`);
    //}
  }
  return responseData;
};

export const addManager = async (data: UserProfile) => {
  let responseData;
  try {
    const response: any = await request("/createManager", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    /*responseData = err.data;
    console.log(err);
    if (err.response.status >= 400 || (!responseData && responseData.status === 0)) {
      throw new Error(
        err.data.errors ||
        err.data.message ||
        `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {*/
    throw new Error(`Something went wrong`);
    //}
  }
  return responseData;
};

export const addOfficeAdmin = async (data: UserProfile) => {
  let responseData;
  try {
    const response: any = await request("/createOfficeAdmin", "POST", data, false);
    responseData = response.data;
  } catch (err) {
    /*responseData = err.data;
    console.log(err);
    if (err.response.status >= 400 || (!responseData && responseData.status === 0)) {
      throw new Error(
        err.data.errors ||
        err.data.message ||
        `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {*/
    throw new Error(`Something went wrong`);
    //}
  }
  return responseData;
};
