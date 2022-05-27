import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { OauthIdentity, User } from "../../domain";
import * as api from "../../services/popup/api";
import { AppActions, AppActionTypes, DISCOGS_BASE_URL, ERROR, View } from "./";
import * as actions from "./app.actions";

import * as appSelectors from "../selectors/app.selectors";
import { ActionTypes } from "../types";
import { get, set } from "../../services/chrome/local.storage";
import { ActionButton } from "./types";

function* getUser(_: any, count = 0): Generator<any> {
  try {
    const identity = yield call(
      api.fetch,
      `${DISCOGS_BASE_URL}/oauth/identity`
    );
    if (identity) {
      const user = yield call(
        api.fetch,
        (identity as OauthIdentity).resource_url
      );
      yield put(actions.getUserSuccess(user as User));
    } else {
      if (count < 10) {
        yield getUser(_, count + 1);
      } else throw new Error(ERROR.NOT_AUTHENTICATED);
    }
  } catch (error) {
    console.log(error);
    yield put(actions.error(ERROR.NOT_AUTHENTICATED));
  }
}

export function* getUserId(): Generator<number> {
  const userId = yield select(appSelectors.getUserId) as any;
  if (userId) {
    yield userId as number;
    return userId;
  } else {
    throw new Error("Cannot find any userId ");
  }
}

export function* notify(
  message: string,
  actionBtn?: ActionButton,
  timeout = 5000
) {
  yield put(actions.notify({ message, actionBtn }));
  yield delay(timeout);
  yield put(actions.notifyReset());
}

export function* warn(message: string, timeout = 5000) {
  yield put(actions.warn({ message }));
  yield delay(timeout);
  yield put(actions.notifyReset());
}

function* setUserToken({ userToken }: AppActionTypes): Generator<any> {
  yield call(api.setUserToken, userToken!);
  yield call(getUser, 0);
}

function* setView({ view }: AppActionTypes): Generator<any> {
  set("view", view);
  yield put(actions.setViewSuccess(view as View));
}
function* getView(): Generator<any> {
  const view = get("view", "");
  console.log(view);
  yield put(actions.setViewSuccess(view as View));
}

function* AppSaga() {
  try {
    yield all([
      takeLatest(AppActions.getUser, getUser),
      takeLatest(AppActions.logOut, setUserToken),
      takeLatest(AppActions.setUserToken, setUserToken),
      takeLatest(AppActions.setUserTokenSuccess, getUser),
      takeLatest(AppActions.setView, setView),
      takeLatest(AppActions.getUserSuccess, getView),
    ]);
  } catch (e) {
    console.error(e);
  }
}

export default AppSaga;
