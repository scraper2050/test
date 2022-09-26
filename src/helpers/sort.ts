export const sortByField = (array: any[], field: string, order: string = 'asc', caseSensitive: boolean = true, asDate: boolean = false) => {
  if (array.length === 0) return [];

  const type = typeof array[0][field];
  return array.sort((a: any, b: any) =>{
    let fieldA = a[field];
    let fieldB = b[field];

    if (type === 'string'){
      if (!caseSensitive) {
        fieldA = a[field].toLowerCase();
        fieldB = b[field].toLowerCase();
      }

      if (asDate) {
        fieldA = new Date(a[field]);
        fieldB = new Date(b[field]);
      }
    }
    return fieldA > fieldB ? (order === 'asc' ? 1 : -1) : fieldB > fieldA ? (order === 'asc' ? -1 : 1) : 0
  });
}

export const stringSortCaseSensitive = (arr: any[], field:any) => {
  return arr.sort((a: string, b: string) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0));
}

export const stringSortCaseInsensitive = (arr: any[], field:any) => {
  return arr.sort((a: string, b: string) => (a[field]?.toLowerCase() > b[field]?.toLowerCase() ? 1 : b[field]?.toLowerCase() > a[field]?.toLowerCase() ? -1 : 0));
}

