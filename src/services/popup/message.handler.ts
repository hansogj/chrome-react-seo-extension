import { ResourceUrl } from "../../domain";
import * as api from "../../services/chrome/api";
import { MessageActions } from "../../services/chrome/types";
import { ActionTypes } from "../../redux";
import { DiscogsActions } from "../../redux/discogs";
import wantListService, { Cache } from "../chrome/wantlist.service";
import fieldsService from "../chrome/selectedFields.service";
import maybe from "maybe-for-sure";
import { SelectedFields } from "../../domain/Inventory";

const services = {
  wantList: wantListService(),
  fields: fieldsService(),
};

let queryOptions = { active: true, currentWindow: true };

const addListener = (myTabId?: number) =>
  chrome.runtime.onMessage.addListener(dispatcher);

const getCurrentTab = (): Promise<chrome.tabs.Tab> =>
  chrome && chrome.tabs && chrome.tabs.query
    ? chrome.tabs.query(queryOptions).then(([tab]) => tab)
    : Promise.reject();

const dispatcher = () => import("../../redux").then(({ action }) => action);

const sendMessage = <T>(id = 0, body: ActionTypes): Promise<Response> =>
  new Promise((resolve, reject) =>
    chrome.tabs.sendMessage(id, body, (response: Response) => resolve(response))
  );

export const fetch = async <T>(
  resource: ResourceUrl,
  body?: SearchParams
): Promise<T> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, { type: MessageActions.fetch, resource, body })
    )
    .catch(() => api.fetch(resource, body));

export const setUserToken = async (userToken: string): Promise<string> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, { type: MessageActions.setUserToken, body: userToken })
    )
    .catch(() => api.setUserToken(userToken))
    .then((e) => `${e}`);

export const manipulateDom = async (body: DiscogsActions): Promise<boolean> =>
  getCurrentTab()
    .then(({ id }) => sendMessage(id, { type: MessageActions.DOM, body: body }))
    .catch(() =>
      console.log("not able to do dom-manipulation in this view: ", body)
    )
    .then(() => true);

export const getWantList = async (): Promise<Cache> =>
  getCurrentTab()
    .then(({ id }) => sendMessage(id, { type: MessageActions.GET_WANT_LIST }))
    .catch(services.wantList.get)
    .then((cache) => maybe(cache).valueOr({}) as Cache);

export const syncWantList = async (url: string): Promise<Cache> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, { type: MessageActions.SYNC_WANT_LIST, body: url })
    )
    .catch(() => services.wantList.sync(url))
    .then((cache) => maybe(cache).valueOr({}) as Cache);

export const setSelectedFields = async (
  selectedFields: SelectedFields
): Promise<SelectedFields> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, {
        type: MessageActions.SYNC_WANT_LIST,
        body: selectedFields as any,
      })
    )
    .catch(() => services.fields.set(selectedFields))
    .then((it) => maybe(it).valueOr(selectedFields) as SelectedFields);

export const getSelectedFields = async (): Promise<SelectedFields> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, {
        type: MessageActions.SYNC_WANT_LIST,
      })
    )
    .catch(() => services.fields.get())
    .then((it) => maybe(it).valueOr({}));
