import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { AuthInfo } from 'app/models/user';
import { connect, useDispatch } from 'react-redux';
import { setAuthAction } from 'actions/auth/auth.action';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { setRouteDataAction, setRouteTitleAction } from 'actions/route/route.action';

interface Props {
  token?: string;
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  title?: string;
  actionData?: {
    title: string,
    link: string
  };
  setAuthAction: (authInfo: AuthInfo) => Action<any>;
}

function AuthRoute({
  token,
  Component,
  path,
  title = '',
  actionData,
  exact = false,
  setAuthAction,
}: Props): JSX.Element | null {
  const storageAuth: AuthInfo = {
    'token': localStorage.getItem('token'),
    'user': JSON.parse(localStorage.getItem('user') || '{}')
  };
  const dispatch = useDispatch();
  const loginFromStorage = (token === null || token === '') && storageAuth.token !== null && storageAuth.token !== '' && storageAuth.user !== null;

  useEffect(
    () => {
      loginFromStorage && setAuthAction(storageAuth);
    },
    [loginFromStorage, setAuthAction, storageAuth]
  );

  useEffect(() => {
    dispatch(setRouteTitleAction(title));
  }, [title])

  useEffect(() => {
    dispatch(setRouteDataAction(actionData));
  }, [actionData])

  if (loginFromStorage) {
    return null;
  }

  const isAuthed = token !== null && token !== '';
  const message = 'Please log in to view this page';

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        isAuthed
          ? <Component {...props} />
          : <Redirect
            to={{
              'pathname': '/',
              'state': {
                message,
                'requestedPath': path
              }
            }}
          />

      }
    />
  );
}
const mapStateToProps = (state: {
  auth: {
    token: string;
  };
}) => ({
  'token': state.auth.token
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  'setAuthAction': (authInfo: AuthInfo) =>
    dispatch(setAuthAction(authInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRoute);
