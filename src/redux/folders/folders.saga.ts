import "@hansogj/array.utils";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  Artist,
  Folder,
  Instance,
  InventoryFields,
  ReleaseInView,
} from "../../domain";
import * as messageHandler from "../../services/popup/message.handler";
import { actions as appActions, AppActions, sagas as appSagas } from "../app";
import { DiscogsActions, DiscogsActionTypes } from "../discogs";
import { fetchResource } from "../discogs/discogs.saga";
import {
  getAddReleaseToFolderResource,
  getFieldsResource,
  getCollectionResource,
  getFoldersResource,
} from "../selectors/resource.selectors";

import * as foldersSelectors from "../selectors/folders.selectors";
import * as discogsSelectors from "../selectors/discogs.selectors";
import * as actions from "./folders.actions";
import { FoldersActionTypes, FoldersActions } from "./types";
import maybe from "maybe-for-sure";

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

function* setSelectedFields({
  selectedFields,
}: FoldersActionTypes): Generator<any> {
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
  const fields = (yield select(foldersSelectors.getSelectedFields)) as Record<
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
  yield notifyInstance(instance);
}

function* getCollection(): Generator<any> {
  yield fetchResource(getCollectionResource);
}

function* notifyInstance(instance: Instance): Generator<any> {
  const { master } = (yield select(
    discogsSelectors.getReleaseInView
  )) as ReleaseInView;

  const artist = maybe(master)
    .mapTo("artists")
    .map((it) => it[0] as Artist)
    .map(({ name }) => name)
    .valueOr("");
  appSagas.notify(`${artist} ${master?.title} added to your folder`);
}

function* onUserSuccess() {
  try {
    yield all([getFolders(), getFields(), getSelectedFields()]);
  } catch (e) {
    debugger;
    console.log(e);
  }
}

function* DiscogsSaga() {
  yield all([
    takeLatest(AppActions.getUserSuccess, onUserSuccess),
    // takeLatest(FoldersActions.getFolders, getFolders),
    takeLatest(FoldersActions.getFoldersSuccess, getCollection),
    takeLatest(FoldersActions.setSelectedFields, setSelectedFields),

    takeLatest(FoldersActions.addToFolder, addToFolder),
  ]);
}

export default DiscogsSaga;
