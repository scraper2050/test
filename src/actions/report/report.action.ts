import { types } from './report.types' 

export const setReportShowing = (isShowing: boolean) => {
  return {
    'payload': isShowing,
    'type': types.SET_REPORT_SHOWING
  };
};