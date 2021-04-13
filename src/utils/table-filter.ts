class TableFilterService {
    static filterByDateDesc<T extends Record<string, any>>(data: T[]): T[] {
        if (Array.isArray(data)) {
            return data.sort((a: T, b: T ) => {
                if (a?.createdAt && b?.createdAt) {
                    const date1 = +new Date(a?.createdAt as string) 
                    const date2 = +new Date(b?.createdAt as string);
                    
                    return date2 - date1; 
                } else {
                    return 1; 
                }
            })
        }

        return data;
    }
}

export default TableFilterService; 