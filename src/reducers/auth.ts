import { handleActions } from "redux-actions";
import { Record } from "immutable";

import { loginActions, logoutAction, setAuthAction } from "actions/auth/auth.action";

const initialState = Record({
  loginApi: Record({
    isLoading: false,
    hasErrored: false,
    msg: "",
  })(),
  token: null,
  user: null,
})();

export default handleActions(
  {
    [loginActions.fetching.toString()]: (state, action) =>
      state
        .setIn(["loginApi", "isLoading"], true),

    [loginActions.success.toString()]: (state, action) => {
      const { token, user } = action.payload;
      return state
        .setIn(["token"], token)
        .setIn(["user"], Record(user)())
        .setIn(["loginApi", "isLoading"], false)
        .setIn(["loginApi", "hasErrored"], false);
    },
    [loginActions.fault.toString()]: (state, action) =>
      state
        .setIn(["loginApi", "isLoading"], false)
        .setIn(["loginApi", "hasErrored"], true)
        .setIn(["loginApi", "msg"], action.payload),
    [setAuthAction.toString()]: (state, action) =>
      state
        .setIn(["token"], action.payload.token)
        .setIn(["user"], Record(action.payload.user)()),
    [logoutAction.toString()]: (state, action) =>
      initialState,
  }, initialState
);
