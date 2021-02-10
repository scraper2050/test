import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

import { loginActions, logoutAction, setAuthAction } from 'actions/auth/auth.action';

const initialState = Record({
  'loginApi': Record({
    'hasErrored': false,
    'isLoading': false,
    'msg': ''
  })(),
  'token': null,
  'user': null
})();

export default handleActions(
  {
    [loginActions.fetching.toString()]: (state, action) => {
      return state
        .setIn(
          ['loginApi', 'isLoading'],
          true
        )
        .setIn(
          ['loginApi', 'hasErrored'],
          false
        )
        .setIn(
          ['loginApi', 'msg'],
          ''
        );
    },

    [loginActions.success.toString()]: (state, action) => {
      const { token, user } = action.payload;

      return state
        .setIn(
          ['token'],
          token
        )
        .setIn(
          ['user'],
          Record(user)()
        )
        .setIn(
          ['loginApi', 'isLoading'],
          false
        )
        .setIn(
          ['loginApi', 'hasErrored'],
          false
        );
    },
    [loginActions.fault.toString()]: (state, action) =>
      state
        .setIn(
          ['loginApi', 'isLoading'],
          false
        )
        .setIn(
          ['loginApi', 'hasErrored'],
          true
        )
        .setIn(
          ['loginApi', 'msg'],
          action.payload
        ),
    [setAuthAction.toString()]: (state, action) =>
      state
        .setIn(
          ['token'],
          action.payload.token
        )
        .setIn(
          ['user'],
          Record(action.payload.user)()
        ),
    [logoutAction.toString()]: (state, action) =>
      initialState
  },
  initialState
);
