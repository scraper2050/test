import { put, call, take, fork, cancelled, cancel } from "redux-saga/effects";
import { loginActions, logoutAction } from "actions/auth";
import { login } from "api/auth";
import { ILoingInfo } from "types/auth";

export function* handleLogin(action: { payload: ILoingInfo }) {
  yield put(loginActions.fetching());
  try {
    const result = yield call(login, action.payload);
    yield put(loginActions.success(result));
  } catch (error) {
    yield put(loginActions.fault(error.toString()));
  }
  finally {
    if (yield cancelled()) {
      yield put(loginActions.cancelled());
    }
  }
}

export default function* authFlow() {
  while (true) {

    const loginAction = yield take(loginActions.fetch);

    const task = yield fork(handleLogin, loginAction);

    const nextAction = yield take([logoutAction, loginActions.fault]);
    if (nextAction.type === logoutAction.name) {
      yield cancel(task);
    }
  }
}
