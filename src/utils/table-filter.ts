import {InvoicingState} from "../actions/invoicing/invoicing.types";

class TableFilterService {
    static filterByDateDesc(data: InvoicingState) {
        if (Array.isArray(data)) {
            return data.sort((a: any, b: any ) => {
                if (a?.createdAt && b?.createdAt) {
                    const date1 = +new Date(a?.createdAt as string)
                    const date2 = +new Date(b?.createdAt as string);

                    return date2 - date1;
                } else {
                    return 1;
                }
            })
        }
      return data.data;
    }
}

export default TableFilterService;
