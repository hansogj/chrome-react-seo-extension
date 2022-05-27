import "@hansogj/array.utils";
import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { Version, WantList } from "../../domain";
import * as api from "../../services/popup/api";
import { AppActions, sagas as appSagas } from "../app";
import { getWantListResource } from "../selectors/resource.selectors";
import { WantListActions, WantListActionTypes } from "./types";
import * as wantListActions from "./wantlist.actions";

const MAX_REQUESTS_PR_MINUTE = 60 - 10; // -10 to get som slack
const second = 1000;
function* syncWantList(): Generator<any> {
  const resource = yield select(getWantListResource);
  const userId = yield call(appSagas.getUserId);
  const result = yield call(
    api.syncWantList,
    userId as number,
    resource as string
  );
  yield put(wantListActions.getWantListSuccess(result as WantList));
  yield appSagas.notify("Want list has been synchronized");
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

function* removeAllVersionsFromWantList({
  master,
}: WantListActionTypes): Generator<any> {
  try {
    const allVersions = yield call(
      api.getAllWantedVersionsOfItem,
      master!.versions_url
    );

    const noOfVersions = (allVersions as Version[]).length;
    if (noOfVersions > MAX_REQUESTS_PR_MINUTE) {
      yield appSagas.notify(
        `Due to limitations in Discogs api, this action is going to take long time <br /> estimated ${noOfVersions} seconds. <br />
         Perhaps you'd rather prefere to do this action as a bulk action from 
        <a href="${master?.uri}" target="blank"> item's master page </a>
        `,
        undefined,
        second * 15
      );
    }
    const wantListResource = yield select(getWantListResource);
    yield* (allVersions as Version[]).map(function* ({ id }, _, self) {
      const interval = self.length > MAX_REQUESTS_PR_MINUTE ? second : 100;
      yield delay(interval);
      yield fork(api.deleteResource, `${wantListResource}/${id}`);
    });

    yield put(wantListActions.removeAllVersionsFromWantListSuccess());
    appSagas.notify(
      `All items of ${master!.title} has been removed from want list`
    );
    yield api.reload();
  } catch (e) {
    appSagas.warn("Failed when trying to remove item from ");
  }
}

function* DiscogsSaga() {
  yield all([
    takeLatest(AppActions.getUserSuccess, getWantList),
    takeLatest(WantListActions.syncWantList, syncWantList),
    takeLatest(
      WantListActions.removeAllVersionsFromWantList,
      removeAllVersionsFromWantList
    ),
  ]);
}

export default DiscogsSaga;
