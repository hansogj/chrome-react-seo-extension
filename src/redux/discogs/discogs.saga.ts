import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Folder, OauthIdentity, User } from "../../api/domain";
import * as messageHandler from "../../messages/handler";
import { getFoldersResource } from "../selectors/resource.selectors";
import {
  getFolders,
  getFoldersSuccess,
  getUserSuccess,
} from "./discogs.actions";
import { DiscogsActions } from "./types";
const discogsBaseUrl = "https://api.discogs.com";

function* onGetUser(): Generator<any> {
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

    yield put(getUserSuccess(user as User));
    yield put(getFolders());
  } catch (error) {
    console.log(error);
  }
}

function* onGetFolders(): Generator<any> {
  try {
    const foldersResource = yield select(getFoldersResource);
    console.log(foldersResource);
    const folders = yield call(messageHandler.fetch, foldersResource as string);
    console.log(folders);
    yield put(getFoldersSuccess(folders as Folder[]));
  } catch (error) {
    console.log(error);
  }
}

function* DiscogsSaga() {
  yield all([takeLatest(DiscogsActions.getFolders, onGetFolders)]);
  yield all([takeLatest(DiscogsActions.getUser, onGetUser)]);
}

export default DiscogsSaga;
