import request from "utils/http.service";

export const getInvoiceEmailTemplate = async (invoiceId: string) => {
  try {
    const response: any = await request(`/getInvoiceEmailTemplate?invoiceId=${invoiceId}`, "GET", {}, false);
    return response;
  } catch (err) {
    console.log(err)
    throw new Error(`Something went wrong`);
  }
};
