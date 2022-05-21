import "@hansogj/array.utils";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { WantList } from "../../domain";
import * as api from "../../services/popup/api";
import { AppActions, sagas as appSagas } from "../app";
import { getWantListResource } from "../selectors/resource.selectors";
import { WantListActions } from "./types";
import * as wantListActions from "./wantlist.actions";

function* syncWantList(): Generator<any> {
  const resource = yield select(getWantListResource);
  const userId = yield call(appSagas.getUserId);
  const result = yield call(
    api.syncWantList,
    userId as number,
    resource as string
  );
  yield put(wantListActions.getWantListSuccess(result as WantList));
}

function* getWantList(): Generator<any> {
  const userId = yield call(appSagas.getUserId);
  let result = yield call(api.getWantList, userId as number);
  if (Object.keys(result as any).length === 0) {
    yield call(syncWantList);
  } else {
    yield put(wantListActions.getWantListSuccess(result as WantList));
  }
}

function* DiscogsSaga() {
  yield all([
    takeLatest(AppActions.getUserSuccess, getWantList),
    takeLatest(WantListActions.syncWantList, syncWantList),
  ]);
}

export default DiscogsSaga;
