import * as api from "../chromeServices/api";
import { DiscogsActions } from "../redux/discogs";
import { actions } from "../redux/discogs";
import { Action } from "../redux";
import { AxiosResponse } from "axios";
import { getFoldersSuccess } from "../redux/discogs/discogs.actions";

let queryOptions = { active: true, currentWindow: true };

const addListener = (myTabId?: number) =>
  chrome.runtime.onMessage.addListener(dispatcher);

const getCurrentTab = (): Promise<chrome.tabs.Tab> =>
  chrome && chrome.tabs && chrome.tabs.query
    ? chrome.tabs.query(queryOptions).then(([tab]) => tab)
    : Promise.reject();

const dispatcher = () => {
  return import("../redux").then(({ action }) => action);
  /*     debugger;
    if (response && !!response.artist)
      action(
        actions.getArtistSuccess(response.artist, response.results) as any
      );
 */
};

const sendMessage = <T>(id = 0, body: Action<T>): Promise<Response> =>
  new Promise((resolve, reject) =>
    chrome.tabs.sendMessage(id, body, (response: Response) => resolve(response))
  );

export const getFolder = async (): Promise<any> => {
  return getCurrentTab()
    .then(({ id }) => {
      sendMessage(id, { type: DiscogsActions.getFolders });
    })
    .catch(() => api.fetchFolders())

    .then((folders) => {
      console.log(folders);
      return dispatcher().then((action) => action(getFoldersSuccess(folders)));
    });
};
