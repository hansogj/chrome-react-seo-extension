import { User } from "../api/domain";
import { ActionTypes } from "../redux";
import { DiscogsActions, DiscogsActionTypes } from "../redux/discogs";
import * as api from "./api";

const messagesFromReactAppListener = (
  action: ActionTypes,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: unknown) => void
) => {
  console.log("message received_ ", action);
  const resolve = (prom: Promise<any>) => prom.then(sendResponse);

  if (action.type === DiscogsActions.getArtist)
    resolve(api.fetchArtist(action.artist));
  if (action.type === DiscogsActions.getFolders) resolve(api.fetchFolders());

  if (action.type === DiscogsActions.getUser) resolve(api.fetchUser());
  return true;
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */

const fetchArtist = (
  { artist }: DiscogsActionTypes,
  sendResponse: (response: Partial<DiscogsActionTypes>) => void
) =>
  api
    .fetchArtist(artist)
    .then((artistResult) => sendResponse({ artist, artistResult }));

const fetchFolders = (sendResponse: (response: User) => void) =>
  api.fetchFolders().then(sendResponse);

chrome &&
  chrome.runtime &&
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
