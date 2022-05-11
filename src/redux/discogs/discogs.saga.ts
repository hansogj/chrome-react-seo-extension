import "@hansogj/array.utils";
import maybe from "maybe-for-sure";
import {
  all,
  call,
  CallEffect,
  delay,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeLatest,
} from "redux-saga/effects";
import { Artist, Folder, Instance, ReleaseInView } from "../../domain";
import { InventoryFields } from "../../domain/InventoryFields";
import * as messageHandler from "../../services/popup/message.handler";
import { AppActions } from "../app/";
import * as appActions from "../app/app.actions";
import {
  getReleaseInView,
  getSelectedFields as getSelectedFieldsSelector,
} from "../selectors";
import {
  getAddReleaseToFolderResource,
  getCollectionResource,
  getFieldsResource,
  getFoldersResource,
  getInventoryResource,
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

function* getCurrentMaster(): Generator<any> {
  const master = yield call(messageHandler.getCurrentMaster);
  if (master) {
    yield put(actions.getCurrentMasterSuccess(master as ReleaseInView));
  }
}

function* onUserSuccess() {
  yield all([getFolders(), getFields(), getSelectedFields()]);
}

function* addToFolder({ releaseId }: DiscogsActionTypes): Generator<any> {
  let result: any = undefined as unknown as any;
  try {
    debugger;
    const resource = yield select(getAddReleaseToFolderResource(releaseId!));
    if (resource) {
      const result = yield call(messageHandler.post, resource as string);
      yield updateSelectedFieldsValues(result as Instance);
    } else {
      yield put(
        appActions.error({ error: "New Item feiler", ...{ releaseId } })
      );
    }
  } catch (error) {
    yield put(appActions.error(error));
  }
  return result;
}

function* updateSelectedFieldsValues(instance: Instance): Generator<any> {
  const fields = (yield select(getSelectedFieldsSelector)) as Record<
    string,
    string
  >;

  const url = instance.resource_url
    .split("?")
    .first()
    .concat(["instances", `${instance?.instance_id}`])
    .join("/");

  yield all(
    Object.entries(fields)
      .filter(([field, _]) => field !== "folders")
      .map(([field_id, value]) => ({
        resource: `${url}/fields/${field_id}`,
        payLoad: { value },
      }))

      .map(({ resource, payLoad }) =>
        call(messageHandler.post as any, resource, { payLoad })
      )
  );
  yield notify(instance);
}

function* notify(instance: Instance): Generator<any> {
  console.log(instance);
  const { master } = (yield select(getReleaseInView)) as ReleaseInView;

  const artist = maybe(master)
    .mapTo("artists")
    .map((it) => it[0] as Artist)
    .map(({ name }) => name)
    .valueOr("");

  yield put(
    appActions.success(`${artist} ${master?.title} added to your folder`)
  );
  yield delay(5000);
  yield put(appActions.success());
}

function* DiscogsSaga() {
  yield all([
    takeLatest(DiscogsActions.getFolders, getFolders),
    takeLatest(AppActions.getUserSuccess, onUserSuccess),
    takeLatest(DiscogsActions.getFoldersSuccess, getCollection),
    takeLatest(DiscogsActions.filterReleases, manipulateDom),
    takeLatest(DiscogsActions.filterSellers, manipulateDom),
    takeLatest(DiscogsActions.setSelectedFields, setSelectedFields),
    takeLatest(DiscogsActions.getCurrentMaster, getCurrentMaster),
    takeLatest(DiscogsActions.addToFolder, addToFolder),
  ]);
}

export default DiscogsSaga;
