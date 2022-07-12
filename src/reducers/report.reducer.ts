import { Reducer } from "redux";
import { ReportState, types } from "../actions/report/report.types";

const initialReport: ReportState = {
  isReportShowing: false,
}

export const reportReducer: Reducer<any> = (
  state = initialReport,
  { payload, type }
) => {
  switch (type) {
    case types.SET_REPORT_SHOWING:
      return {
        ...state,
        isReportShowing: payload,
      }
    default:
      return state
  }
}