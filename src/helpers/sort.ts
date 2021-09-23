

export const stringSortCaseSensitive = (arr: any[], field:any) => {
  return arr.sort((a: string, b: string) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0));
}

export const stringSortCaseInsensitive = (arr: any[], field:any) => {
  return arr.sort((a: string, b: string) => (a[field].toLowerCase() > b[field].toLowerCase() ? 1 : b[field].toLowerCase() > a[field].toLowerCase() ? -1 : 0));
}

