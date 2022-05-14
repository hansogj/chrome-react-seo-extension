import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { OauthIdentity, User } from "../../domain";
import * as messageHandler from "../../services/popup/message.handler";
import { AppActions, AppActionTypes, DISCOGS_BASE_URL, ERROR } from "./";
import * as actions from "./app.actions";

function* getUser(_: any, count = 0): Generator<any> {
  try {
    const identity = yield call(
      messageHandler.fetch,
      `${DISCOGS_BASE_URL}/oauth/identity`
    );
    if (identity) {
      const user = yield call(
        messageHandler.fetch,
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

export function* notify(message: string) {
  yield put(actions.success(message));
  yield delay(5000);
  yield put(actions.success());
}

function* setUserToken({ userToken }: AppActionTypes): Generator<any> {
  yield call(messageHandler.setUserToken, userToken!);
  yield call(getUser, 0);
}

function* notifucationTest(): Generator<any> {
  yield call(notify, "gay sveis");
}

function* AppSaga() {
  try {
    yield all([
      takeLatest(AppActions.getUser, getUser),
      takeLatest(AppActions.logOut, setUserToken),
      takeLatest(AppActions.setUserToken, setUserToken),
      takeLatest(AppActions.setUserTokenSuccess, getUser),
    ]);
  } catch (e) {
    console.error(e);
  }
}

export default AppSaga;
