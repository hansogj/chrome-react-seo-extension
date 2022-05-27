import "@hansogj/array.utils";
import maybe from "maybe-for-sure";
import {
  all,
  call,
  fork,
  put,
  race,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import {
  Artist,
  Folder,
  Instance,
  InventoryFields,
  MasterRelease,
} from "../../domain";
import * as api from "../../services/popup/api";
import { actions as appActions, AppActions, sagas as appSagas } from "../app";
import { DiscogsActionTypes, sagas as discogsSaga } from "../discogs";
import {
  getAddReleaseToFolderResource,
  getCollectionResource,
  getFieldsResource,
  getFoldersResource,
  getSelectedFields as getSelectedFieldsSelector,
} from "../selectors";
import { actions as wantListActions, WantListActions } from "../wantlist";
import * as actions from "./folders.actions";
import { FoldersActions, FoldersActionTypes } from "./types";

function* getFolders(): Generator<any> {
  const result = yield discogsSaga.fetchResource(getFoldersResource);
  if (result) {
    yield put(
      actions.getFoldersSuccess((result as { folders: Folder[] }).folders)
    );
  }
}

function* getFields(): Generator<any> {
  const result = yield discogsSaga.fetchResource(getFieldsResource);
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
  const userId = yield call(appSagas.getUserId);
  const allFields = yield call(
    api.setSelectedFields,
    userId as number,
    selectedFields!
  );
  yield put(
    actions.setSelectedFieldsSuccess(allFields as Record<string, string>)
  );
}

function* getSelectedFields(): Generator<any> {
  const userId = yield call(appSagas.getUserId);
  const allFields = yield call(api.getSelectedFields, userId as number);

  yield put(
    actions.setSelectedFieldsSuccess(allFields as Record<string, string>)
  );
}

function* addToFolder({ releaseId }: DiscogsActionTypes): Generator<any> {
  let result: any = undefined as unknown as any;
  try {
    const resource = yield select(getAddReleaseToFolderResource(releaseId!));
    if (resource) {
      const result = yield call(api.post, resource as string);
      yield updateSelectedFieldsValues(result as Instance);
      yield notifyNewInstance(result as Instance);
    } else {
      yield put(
        appActions.warn({
          message: "Failing to add new item: " + releaseId,
        })
      );
    }
  } catch (error) {
    yield appActions.warn({
      message: "Fail to fetch resource for release " + releaseId,
    });
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
        call(api.post as any, resource, { payLoad })
      )
  );
}

function* getCollection(): Generator<any> {
  yield discogsSaga.fetchResource(getCollectionResource);
}

function* notifyNewInstance(this: any, instance: Instance): Generator<any> {
  const master = yield api.fetch(instance.basic_information.master_url);
  const { artists, title } = master as MasterRelease;

  const artist = maybe(artists)
    .map((it) => it[0] as Artist)
    .map(({ name }) => name)
    .valueOr("");

  yield fork(
    appSagas.notify,
    `${artist} ${title} added to your folder <br/> Do you also want to remove all of this items from your want list?`,
    {
      action: wantListActions.removeAllVersionsFromWantList(
        master as MasterRelease
      ),
      text: "Yes please",
    }
  );

  const result = yield race({
    notify: take(AppActions.notifyReset),
    remove: take(WantListActions.removeAllVersionsFromWantList),
  });

  if ((result as any).notify) {
    yield api.reload();
  } else {
    yield put(actions.addToFolderSuccess());
  }
}

function* onUserSuccess() {
  try {
    yield put(appActions.notifyReset());
    yield all([getFolders(), getFields(), getSelectedFields()]);
  } catch (e) {
    console.log(e);
  }
}

function* DiscogsSaga() {
  yield all([
    takeLatest(AppActions.getUserSuccess, onUserSuccess),
    takeLatest(FoldersActions.getFoldersSuccess, getCollection),
    takeLatest(FoldersActions.setSelectedFields, setSelectedFields),
    takeLatest(FoldersActions.addToFolder, addToFolder),
  ]);
}

export default DiscogsSaga;
