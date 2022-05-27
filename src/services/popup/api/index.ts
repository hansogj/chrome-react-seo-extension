import maybe from "maybe-for-sure";
import { MasterRelease, ResourceUrl } from "../../../domain";
import { SelectedFields } from "../../../domain/Inventory";
import { DiscogsActions } from "../../../redux/discogs";
import { MessageActions } from "../../../services/chrome/types";
import { Cache } from "../../chrome/wantlist.service";
import messageHandler from "../message.handler";
import { getMockRelease } from "./__mock__/release.in.view";

export const fetch = async <T>(resource: ResourceUrl, body?: SearchParams) =>
  messageHandler<T>({ type: MessageActions.fetch, resource, body });

export const put = async <T>(
  resource: ResourceUrl,
  body?: SearchParams & PayLoad
) => messageHandler<T>({ type: MessageActions.put, resource, body });

export const post = async <T>(
  resource: ResourceUrl,
  body?: SearchParams & PayLoad
) => messageHandler<T>({ type: MessageActions.post, resource, body });

export const deleteResource = async <T>(resource: ResourceUrl) =>
  messageHandler<T>({ type: MessageActions.deleteResource, resource });

export const setUserToken = async (userToken: string) =>
  messageHandler({ type: MessageActions.setUserToken, body: userToken }).then(
    (e) => `${e}`
  );

export const manipulateDom = async (body: DiscogsActions) =>
  messageHandler({ type: MessageActions.DOM, body: body }).catch(
    () =>
      new Error(
        "not able to do dom-manipulation in this view: " + JSON.stringify(body)
      )
  );

export const getWantList = async (userId: number) =>
  messageHandler<Cache>({ type: MessageActions.GET_WANT_LIST, userId }).then(
    (cache) => maybe(cache).valueOr({}) as Cache
  );

export const syncWantList = async (userId: number, url: string) =>
  messageHandler<Cache>({
    type: MessageActions.SYNC_WANT_LIST,
    body: url,
    userId,
  }).then((cache) => maybe(cache).valueOr({}) as Cache);

export const setSelectedFields = async (
  userId: number,
  selectedFields: SelectedFields
) =>
  messageHandler<SelectedFields>({
    type: MessageActions.SET_SELECTED_FIELDS,
    body: selectedFields as any,
    userId,
  }).then((it) => maybe(it).valueOr(selectedFields));

export const getSelectedFields = async (userId: number) =>
  messageHandler<SelectedFields>({
    type: MessageActions.GET_SELECTED_FIELDS,
    userId,
  }).then((it) => maybe(it).valueOr({}));

export const getReleasePageItem = async () =>
  messageHandler<Optional<MasterRelease>>(
    { type: MessageActions.GET_RELEASE_PAGE_ITEM_ID },
    { resource: getMockRelease() }
  );

export const reload = async () =>
  messageHandler<Optional<MasterRelease>>({
    type: MessageActions.WINDOW_RELOAD,
  });

export const getAllWantedVersionsOfItem = async (resource: string) =>
  messageHandler<Optional<MasterRelease>>({
    type: MessageActions.GET_ALL_WANTED_VERSIONS_OF_ITEM,
    resource,
  });
