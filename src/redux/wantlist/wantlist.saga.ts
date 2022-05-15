import "@hansogj/array.utils";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { WantList } from "../../domain";
import * as api from "../../services/popup/api";
import { AppActions } from "../app";
import { getWantListResource } from "../selectors/resource.selectors";
import * as actions from "./wantlist.actions";

function* getWantList(): Generator<any> {
  const wantList = yield select(getWantListResource);
  let result = yield call(api.getWantList);
  if (Object.keys(result as any).length === 0) {
    result = yield call(api.syncWantList as any, wantList);
  }

  yield put(actions.getWantListSuccess(result as WantList));
}

function* DiscogsSaga() {
  yield all([takeLatest(AppActions.getUserSuccess, getWantList)]);
}

export default DiscogsSaga;
