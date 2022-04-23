import { all, call, put, takeLatest } from "redux-saga/effects";
import { Folder, User } from "../../api/domain";
import * as messageHandler from "../../messages/handler";
import { getFoldersSuccess, getUserSuccess } from "./discogs.actions";
import { DiscogsActions } from "./types";

function* onGetUser(): Generator<any> {
  try {
    const user = yield call(messageHandler.getUser);
    console.log(user);
    yield put(getUserSuccess(user as User));
  } catch (error) {
    console.log(error);
  }
}

function* onGetFolders(): Generator<any> {
  try {
    const folders = yield call(messageHandler.getFolders);
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
