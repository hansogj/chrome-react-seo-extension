import maybe from "maybe-for-sure";
import { MasterRelease, ResourceUrl } from "../../../domain";
import { SelectedFields } from "../../../domain/Inventory";
import { ActionTypes } from "../../../redux";
import { ERROR, getMockRelease } from "../../../redux/app";
import { DiscogsActions } from "../../../redux/discogs";
import { MessageActions } from "../../../services/chrome/types";
import { messageResolver } from "../../chrome/message.handler";
import { Cache } from "../../chrome/wantlist.service";
import messageHandler from "../message.handler";

export const fetch = async <T>(resource: ResourceUrl, body?: SearchParams) =>
  messageHandler<T>({ type: MessageActions.fetch, resource, body });

export const post = async <T>(
  resource: ResourceUrl,
  body?: SearchParams & PayLoad
) => messageHandler<T>({ type: MessageActions.post, resource, body });

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

export const getWantList = async () =>
  messageHandler<Cache>({ type: MessageActions.GET_WANT_LIST }).then(
    (cache) => maybe(cache).valueOr({}) as Cache
  );

export const syncWantList = async (url: string) =>
  messageHandler<Cache>({
    type: MessageActions.SYNC_WANT_LIST,
    body: url,
  }).then((cache) => maybe(cache).valueOr({}) as Cache);

export const setSelectedFields = async (selectedFields: SelectedFields) =>
  messageHandler<SelectedFields>({
    type: MessageActions.SET_SELECTED_FIELDS,
    body: selectedFields as any,
  }).then((it) => maybe(it).valueOr(selectedFields));

export const getSelectedFields = async () =>
  messageHandler<SelectedFields>({
    type: MessageActions.GET_SELECTED_FIELDS,
  }).then((it) => maybe(it).valueOr({}));

export const getCurrentMaster = async () =>
  messageHandler<Optional<MasterRelease>>(
    { type: MessageActions.GET_CURRENT_MASTER_ID },
    { resource: getMockRelease() }
  );
