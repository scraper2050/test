import { all } from "redux-saga/effects";

import customersSaga from "./customers.saga";
import jobTypesSaga from "./job-types.saga";
import authFlow from "./auth.saga";

export default function* rootSaga() {
  yield all([
    customersSaga(),
    jobTypesSaga(),
    authFlow(),
  ]);
}
