import request from "utils/http.service";

export const getTodos = async (params = {}) => {
    let responseData;
    try {
        const response: any = await request("/getJobs", "POST", params, false);
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
    return responseData.jobs;
};

export const getInvoicingList = async (params = {}) => {
    let responseData;
    try {
        const response: any = await request("/getInvoices", "POST", params, false);
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
    return responseData.invoices;
};

export const getPurchaseOrder = async (params = {}) => {
    let responseData;
    try {
        const response: any = await request("/getAllPurchaseOrder", "POST", params, false);
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
    return responseData.purchaseOrders;
};

export const getInvoicingEstimates = async (params = {}) => {
    let responseData;
    try {
        const response: any = await request("/getEstimate", "POST", params, false);
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
    return responseData.estimates;
};
