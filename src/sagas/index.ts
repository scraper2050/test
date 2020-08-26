import { all } from "redux-saga/effects";

import customersSaga from "./customers";
import jobTypesSaga from "./jobTypes";
import authFlow from "./auth";

export default function* rootSaga() {
  yield all([
    customersSaga(),
    jobTypesSaga(),
    authFlow(),
  ]);
}
