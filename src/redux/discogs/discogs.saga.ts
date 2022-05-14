import "@hansogj/array.utils";
import {
  all,
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeLatest,
} from "redux-saga/effects";
import { ReleaseInView } from "../../domain";
import * as messageHandler from "../../services/popup/message.handler";
import * as appActions from "../app/app.actions";
import {
  getFieldsResource,
  getFoldersResource,
  getInventoryResource,
  ResourceSelectors,
} from "../selectors/resource.selectors";
import { DiscogsActions } from "./";
import * as actions from "./discogs.actions";
import { DiscogsActionTypes } from "./types";

export function* fetchResource<T>(
  selector: ResourceSelectors,
  body?: SearchParams
): Generator<SelectEffect | CallEffect | PutEffect, T, T> {
  let result: T = undefined as unknown as T;
  try {
    const resource = yield select(selector);
    if (resource) {
      result = yield call(messageHandler.fetch as any, resource, body);
    } else {
      yield put(appActions.getUser());
    }
  } catch (error) {
    yield put(appActions.error(error));
  }
  return result;
}

function* getDiscogsInventory(): Generator<any> {
  yield fetchResource(getInventoryResource);
  yield fetchResource(getFoldersResource);
  yield fetchResource(getFieldsResource);
}

function* manipulateDom({ type }: DiscogsActionTypes): Generator<any> {
  yield call(messageHandler.manipulateDom, type);
}

function* getCurrentMaster(): Generator<any> {
  const master = yield call(messageHandler.getCurrentMaster);
  debugger;
  if (master) {
    yield put(actions.getCurrentMasterSuccess(master as ReleaseInView));
  }
}

function* DiscogsSaga() {
  yield all([
    takeLatest(DiscogsActions.filterReleases, manipulateDom),
    takeLatest(DiscogsActions.filterSellers, manipulateDom),
    takeLatest(DiscogsActions.getCurrentMaster, getCurrentMaster),
  ]);
}

export default DiscogsSaga;
