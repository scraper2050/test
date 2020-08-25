import { all } from "redux-saga/effects";

import customersSaga from "./customers";
import jobTypesSaga from "./jobTypes";

export default function* rootSaga() {
  yield all([
    customersSaga(),
    jobTypesSaga(),
  ]);
}
