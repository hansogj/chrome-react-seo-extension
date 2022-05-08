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
import { Folder, WantList } from "../../domain";
import { InventoryFields } from "../../domain/InventoryFields";
import * as messageHandler from "../../services/popup/message.handler";
import { AppActions } from "../app/";
import * as appActions from "../app/app.actions";
import {
  getCollectionResource,
  getFieldsResource,
  getFoldersResource,
  getInventoryResource,
  getWantListResource,
  ResourceSelectors,
} from "../selectors/resource.selectors";
import { DiscogsActions } from "./";
import * as actions from "./discogs.actions";
import { DiscogsActionTypes } from "./types";

function* getFolders(): Generator<any> {
  const result = yield fetchResource(getFoldersResource);
  if (result) {
    yield put(
      actions.getFoldersSuccess((result as { folders: Folder[] }).folders)
    );
  }
}

function* getFields(): Generator<any> {
  const result = yield fetchResource(getFieldsResource);
  if (result)
    yield put(
      actions.getInventoryFieldsSuccess(
        (result as { fields: InventoryFields }).fields
      )
    );
}

function* getWantList(): Generator<any> {
  const wantList = yield select(getWantListResource);
  let result = yield call(messageHandler.getWantList);
  if (Object.keys(result as any).length === 0) {
    result = yield call(messageHandler.syncWantList as any, wantList);
  }

  yield put(actions.getWantListSuccess(result as WantList));
}

function* fetchResource<T>(
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

function* getCollection(): Generator<any> {
  yield fetchResource(getCollectionResource);
}

function* manipulateDom({ type }: DiscogsActionTypes): Generator<any> {
  yield call(messageHandler.manipulateDom, type);
}

function* setSelectedFields({
  selectedFields,
}: DiscogsActionTypes): Generator<any> {
  const allFields = yield call(
    messageHandler.setSelectedFields,
    selectedFields!
  );
  yield put(
    actions.setSelectedFieldsSuccess(allFields as Record<string, string>)
  );
}

function* getSelectedFields(): Generator<any> {
  const allFields = yield call(messageHandler.getSelectedFields);
  yield put(
    actions.setSelectedFieldsSuccess(allFields as Record<string, string>)
  );
}

function* onUserSuccess() {
  yield getFolders();
  yield getWantList();
  yield getFields();
  yield getSelectedFields();

  // takeLatest(DiscogsActions.getWantList, getWantList),
}

function* DiscogsSaga() {
  yield all([
    takeLatest(DiscogsActions.getFolders, getFolders),
    takeLatest(AppActions.getUserSuccess, onUserSuccess),
    // takeLatest(DiscogsActions.getWantList, getWantList),
    //    takeLatest(AppActions.getUserSuccess, getDiscogsInventory),
    takeLatest(DiscogsActions.getFoldersSuccess, getCollection),
    takeLatest(DiscogsActions.filterReleases, manipulateDom),
    takeLatest(DiscogsActions.filterSellers, manipulateDom),
    takeLatest(DiscogsActions.setSelectedFields, setSelectedFields),
  ]);
}

export default DiscogsSaga;
