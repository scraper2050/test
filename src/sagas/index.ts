import { all } from "redux-saga/effects";

import customersSaga from "./customers";

export default function* rootSaga() {
  yield all([
    customersSaga(),
  ]);
}
