import { createStore, applyMiddleware, compose, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./root.reducers";
import rootSaga from "./root.sagas";
import { DiscogsActionTypes } from "./discogs";

/* 

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : compose;

const store = createStore(
  rootReducer,
  isProduction
    ? composeEnhancers(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export type Action<T> = { type: T };

export default store;

 */

const isProduction = false;
const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(
  rootReducer,
  isProduction
    ? applyMiddleware(sagaMiddleware)
    : composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export type ActionTypes = DiscogsActionTypes;

export const action = (type: ActionTypes): ActionTypes => store.dispatch(type);
