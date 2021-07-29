import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

import { changePasswordAction, loginActions, logoutAction, setAuthAction } from 'actions/auth/auth.action';

const initialState = Record({
  'changePasswordApi': Record({
    'hasErrored': false,
    'isLoading': false,
    'msg': ''
  })(),
  'loginApi': Record({
    'hasErrored': false,
    'isLoading': false,
    'msg': ''
  })(),
  'company': null,
  'token': null,
  'user': null
})();

export default handleActions(
  {
    [changePasswordAction.fetching.toString()]: (state, action) => {
      return state
        .setIn(
          ['changePasswordApi', 'isLoading'],
          true
        )
        .setIn(
          ['changePasswordApi', 'hasErrored'],
          false
        )
        .setIn(
          ['changePasswordApi', 'msg'],
          ''
        );
    },
    [changePasswordAction.success.toString()]: (state, action) => {
      return state
        .setIn(
          ['changePasswordApi', 'isLoading'],
          false
        )
        .setIn(
          ['changePasswordApi', 'hasErrored'],
          false
        )
        .setIn(
          ['changePasswordApi', 'msg'],
          action.payload
        );
    },
    [changePasswordAction.fault.toString()]: (state, action) => {
      return state
        .setIn(
          ['changePasswordApi', 'isLoading'],
          false
        )
        .setIn(
          ['changePasswordApi', 'hasErrored'],
          true
        )
        .setIn(
          ['changePasswordApi', 'msg'],
          action.payload
        );
    },
    [changePasswordAction.cancelled.toString()]: (state, action) => {
      return state
        .setIn(
          ['changePasswordApi', 'isLoading'],
          false
        )
        .setIn(
          ['changePasswordApi', 'hasErrored'],
          false
        )
        .setIn(
          ['changePasswordApi', 'msg'],
          ''
        );
    },

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
      const { token, user, company } = action.payload;

      let userData = {
        // @ts-ignore
        ...user,
        ...{
          companyInfo: {
            name: company.info.companyName,
            logoUrl: company.info.logoUrl
          }
        }
      }

      return state
        .setIn(
          ['token'],
          token
        )
        .setIn(
          ['user'],
          Record(userData)()
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
