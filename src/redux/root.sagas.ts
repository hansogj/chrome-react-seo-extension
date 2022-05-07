import { all, fork } from "redux-saga/effects";
import DiscogsSaga from "./discogs/discogs.saga";
import AppSaga from "./app/app.saga";

export default function* rootSaga() {
  try {
    yield all([fork(DiscogsSaga), fork(AppSaga)]);
  } catch (error) {
    debugger;
  }
}
