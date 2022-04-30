import { debug } from "console";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Folder, OauthIdentity, User } from "../../api/domain";
import * as messageHandler from "../../messages/handler";
import { getFoldersResource } from "../selectors/resource.selectors";
import * as actions from "./discogs.actions";
import { DiscogsActions, DiscogsActionTypes } from "./types";
const discogsBaseUrl = "https://api.discogs.com";

function* getUser(): Generator<any> {
  try {
    const identity = yield call(
      messageHandler.fetch,
      `${discogsBaseUrl}/oauth/identity`
    );

    const user = yield call(
      messageHandler.fetch,
      (identity as OauthIdentity).resource_url
    );
    console.log(identity, user);

    yield put(actions.getUserSuccess(user as User));
    // yield put(getFolders());
  } catch (error) {
    console.log(error);
  }
}

function* getFolders(): Generator<any> {
  try {
    const foldersResource = yield select(getFoldersResource);
    if (foldersResource) {
      console.log(foldersResource);
      const folders = yield call(
        messageHandler.fetch,
        foldersResource as string
      );
      console.log(folders);
      yield put(actions.getFoldersSuccess(folders as Folder[]));
    } else {
      yield put(actions.getUser());
    }
  } catch (error) {
    console.log(error);
  }
}

function* setUserToken({ userToken }: DiscogsActionTypes): Generator<any> {
  debugger;
  try {
    yield call(messageHandler.setUserToken, userToken!);
    yield put(actions.getFolders());
  } catch (error) {}
}
function* DiscogsSaga() {
  yield all([
    takeLatest(DiscogsActions.getFolders, getFolders),
    takeLatest(DiscogsActions.getUser, getUser),
    takeLatest(DiscogsActions.getUserSuccess, getFolders),
    takeLatest(DiscogsActions.setUserToken, setUserToken),
  ]);
}

export default DiscogsSaga;
