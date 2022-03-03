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
