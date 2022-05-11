import { all, fork } from "redux-saga/effects";
import DiscogsSaga from "./discogs/discogs.saga";
import AppSaga from "./app/app.saga";
import WantListSaga from "./wantlist/wantlist.saga";

export default function* rootSaga() {
  try {
    yield all([fork(DiscogsSaga), fork(AppSaga), fork(WantListSaga)]);
  } catch (error) {
    debugger;
  }
}
