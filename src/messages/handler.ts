import { ResourceUrl } from "../api/domain";
import * as api from "../chromeServices/api";
import { MessageActions } from "../chromeServices/types";
import { ActionTypes } from "../redux";

let queryOptions = { active: true, currentWindow: true };

const addListener = (myTabId?: number) =>
  chrome.runtime.onMessage.addListener(dispatcher);

const getCurrentTab = (): Promise<chrome.tabs.Tab> =>
  chrome && chrome.tabs && chrome.tabs.query
    ? chrome.tabs.query(queryOptions).then(([tab]) => tab)
    : Promise.reject();

const dispatcher = () => import("../redux").then(({ action }) => action);

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
      sendMessage(id, {
        type: MessageActions.fetch,
        resource,
        body,
      })
    )
    .catch(() => api.fetch(resource, body));

export const setUserToken = async (userToken: string): Promise<boolean> =>
  getCurrentTab()
    .then(({ id }) =>
      sendMessage(id, {
        type: MessageActions.setUserToken,
        body: { userToken },
      })
    )
    .catch(() => api.setUserToken(userToken))
    .then(() => true);
