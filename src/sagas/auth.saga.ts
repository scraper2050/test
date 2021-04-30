import { Auth, ChangePassword } from 'app/models/user';
import { changePassword, login } from 'api/auth.api';
import { call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import { changePasswordAction, loginActions, logoutAction } from 'actions/auth/auth.action';

export function *handleLogin(action: { payload: Auth }) {
  yield put(loginActions.fetching());
  try {
    const result = yield call(
      login,
      action.payload
    );
    if (result.message === 'Invalid email/password.') {
      yield put(loginActions.fault('Incorrect Email / Password'));
    } else {
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

export function *handleChangePassword(action: {payload: ChangePassword}) {
  yield put(changePasswordAction.fetching());
  try {
    const result = yield call(
      changePassword,
      action.payload
    );
    if (result.message) {
      yield put(changePasswordAction.fault(result.message));
    } else {
      yield put(changePasswordAction.success(result));
    }
  } catch (error) {
    yield put(changePasswordAction.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(changePasswordAction.cancelled());
    }
  }
}

export default function *authFlow() {
  while (true) {
    yield takeLatest(changePasswordAction.fetch, handleChangePassword);
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
