import { all, fork } from "redux-saga/effects";
import DiscogsSaga from "./discogs/discogs.saga";

export default function* rootSaga() {
  try {
    yield all([fork(DiscogsSaga)]);
  } catch (error) {
    debugger;
  }
}
