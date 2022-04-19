import { User } from "../api/domain";
import { ActionTypes } from "../redux";
import { DiscogsActions, DiscogsActionTypes } from "../redux/discogs";
import * as api from "./api";

const messagesFromReactAppListener = (
  action: ActionTypes,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: unknown) => void
) => {
  if (action.type === DiscogsActions.getArtist)
    fetchArtist(action as DiscogsActionTypes, sendResponse);

  if (action.type === DiscogsActions.getFolders) fetchFolders(sendResponse);
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
  api.fetchFolders().then((user: User) => sendResponse({ user }));

chrome &&
  chrome.runtime &&
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
