import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from 'sagas';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, ReduxThunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
