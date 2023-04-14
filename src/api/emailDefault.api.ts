import request from "utils/http.service";

export const getInvoiceEmailTemplate = async (invoiceId: string|string[]) => {
  try {
    let params  = '';
    if (Array.isArray(invoiceId)) {
      params = `invoiceIds=${JSON.stringify(invoiceId)}&emailType=INVOICES`;
    } else {
      params = `invoiceId=${invoiceId}&emailType=INVOICE`;
    }
    const response: any = await request(`/getInvoiceEmailTemplate?${params}`, "GET", {}, false);
    return response;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
};
