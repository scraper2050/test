import { Auth } from 'app/models/user';
import { login } from 'api/auth.api';
import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import { loginActions, logoutAction } from 'actions/auth/auth.action';

export function* handleLogin(action: { payload: Auth }) {
  yield put(loginActions.fetching());
  try {
    const result = yield call(
      login,
      action.payload
    );
    if (result.message === "Invalid email/password.") {
      yield put(loginActions.fault("Incorrect Email / Password"));
    } else {
      console.log(result, 'result')
      yield put(loginActions.success(result));
    }
  } catch (error) {
    yield put(loginActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loginActions.cancelled());
    }
  }
}

export default function* authFlow() {
  while (true) {
    const loginAction = yield take(loginActions.fetch);

    const task = yield fork(
      handleLogin,
      loginAction
    );

    const nextAction = yield take([logoutAction, loginActions.fault]);
    if (nextAction.type === logoutAction.name) {
      yield cancel(task);
    }
  }
}
