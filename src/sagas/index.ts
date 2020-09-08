import { all } from "redux-saga/effects";
import authFlow from "./auth.saga";
import customersSaga from "./customer.saga";
import jobTypesSaga from "./job-type.saga";
import { watchCompanyContractsLoad } from "./vendor.saga";
import watchAllEmployeesLoad from "./employee.saga";
import watchAllCompanyEquipmentsLoad from "./company-equipment.saga";

import bcModalSaga from './bc-modal.saga';
import jobSaga from './job.saga';
import watchGetTaxs from './tax.saga'

export default function* rootSaga() {
  yield all([
    customersSaga(),
    jobTypesSaga(),
    authFlow(),
    watchCompanyContractsLoad(),
    watchAllEmployeesLoad(),
    watchAllCompanyEquipmentsLoad(),
    jobSaga(),
    watchGetTaxs(),
    bcModalSaga(),
  ]);
}
