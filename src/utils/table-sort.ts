import { formatYMDDateTime } from '../helpers/format'

export const sortArrByDate = (arr: any[], datePath: string) => {
  return arr.sort((a: any, b: any) => {
    const dateA = formatYMDDateTime(a[datePath]);
    const dateB = formatYMDDateTime(b[datePath]);
    return dateB.localeCompare(dateA)
  })
}