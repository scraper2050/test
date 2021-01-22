import request from "utils/http.service";

export const getJobReport = async (data: any) => {
  const body = {
    jobId: data.jobId,
  };
  let responseData;
  try {
    const response: any = await request("/getJobReport", "POST", body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(
        err.data.errors ||
          err.data.message ||
          `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else if (responseData === "") {
      throw new Error(`No Job Record Found`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};

//export const getJobReportDetail = async (data: any) => {};
