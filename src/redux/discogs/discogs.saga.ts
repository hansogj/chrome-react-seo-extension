import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as messageHandler from "../../messages/handler";
import { getFoldersSuccess } from "./discogs.actions";
import { DiscogsActions } from "./types";

function* onGetFolders() {
  try {
    // @ts-ignore
    const response: any = yield call(messageHandler.getFolder);
    put(getFoldersSuccess(response));
  } catch (error) {
    debugger;
    console.log(error);
  }
}

function* DiscogsSaga() {
  yield all([takeLatest(DiscogsActions.getFolders, onGetFolders)]);
}

export default DiscogsSaga;
