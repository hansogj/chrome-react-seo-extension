import { MasterRelease, ResourceUrl } from "../../domain";
import * as api from "../../services/chrome/api";
import { MessageActions } from "../../services/chrome/types";
import { ActionTypes } from "../../redux";
import { DiscogsActions } from "../../redux/discogs";
import wantListService, { Cache } from "../chrome/wantlist.service";
import fieldsService from "../chrome/selectedFields.service";
import maybe from "maybe-for-sure";
import { SelectedFields } from "../../domain/Inventory";
import { masterRelease } from "../chrome/master.release";
import { ERROR, getMockRelease, MOCKED_RELEASE_URL } from "../../redux/app";
import { messageResolver } from "../chrome/message.handler";

const services = {
  wantList: wantListService(),
  fields: fieldsService(),
};

type Rejection = { error: unknown };
let queryOptions = { active: true, currentWindow: true };

/* const addListener = (myTabId?: number) =>
  chrome.runtime.onMessage.addListener(dispatcher);
  const dispatcher = () => import("../../redux").then(({ action }) => action);
 */
const getCurrentTab = (): Promise<chrome.tabs.Tab> =>
  chrome && chrome.tabs && chrome.tabs.query
    ? chrome.tabs.query(queryOptions).then(([tab]) => tab)
    : Promise.reject(ERROR.NO_TAB_TO_CAPTURE);

const sendMessage = <T>(id = 0, body: ActionTypes): Promise<Response> =>
  new Promise((resolve, reject) => {
    try {
      return chrome.tabs.sendMessage(
        id,
        body,
        (response: Response | Rejection) => {
          response && (response as Rejection).error
            ? reject(response as Rejection)
            : resolve(response as Response);
        }
      );
    } catch (error) {
      console.error("failing in sending message", error);
      reject(error);
    }
  });

export const fetch = async <T>(
  resource: ResourceUrl,
  body?: SearchParams
): Promise<T> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, { type: MessageActions.fetch, resource, body })
    )
    .catch(() => api.fetch(resource, body));

export const post = async <T>(
  resource: ResourceUrl,
  body?: SearchParams & PayLoad
): Promise<T> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, { type: MessageActions.post, resource, body })
    )
    .catch(() => api.post(resource, body));

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
        type: MessageActions.SET_SELECTED_FIELDS,
        body: selectedFields as any,
      })
    )
    .catch(() => services.fields.set(selectedFields))
    .then((it) => maybe(it).valueOr(selectedFields) as SelectedFields);

export const getSelectedFields = async (): Promise<SelectedFields> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, {
        type: MessageActions.GET_SELECTED_FIELDS,
      })
    )
    .catch(() => services.fields.get())
    .then((it) => maybe(it).valueOr({}));

export const getCurrentMaster = async (): Promise<Optional<MasterRelease>> =>
  messageHandler(
    { type: MessageActions.GET_CURRENT_MASTER_ID },
    {
      resource: getMockRelease(),
    }
  ) as any;
/* getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, {
        type: MessageActions.GET_CURRENT_MASTER_ID,
      })
    )
    .catch((e) => {
      debugger;
      console.error(e);
      return masterRelease(
        "https://www.discogs.com/release/10083775-Walter-Smith-III-Live-In-Paris"
      );
    }) //MOCKED_RELEASE_URL))
    .then((it) => maybe(it).valueOr(undefined) as Optional<MasterRelease>); */

const resolver = (prom: Promise<unknown>) =>
  prom
    .then((e) => Promise.resolve(e))
    .catch((error) => Promise.reject({ error }));

const messageHandler = (
  action: ActionTypes,
  override: Partial<ActionTypes> = {}
) => {
  return getCurrentTab()
    .then(({ id }) => sendMessage(id, action))
    .catch((e) => {
      if (ERROR.NO_TAB_TO_CAPTURE) {
        return messageResolver({ ...action, ...override }, resolver);
      }
      throw e;
    });
};
