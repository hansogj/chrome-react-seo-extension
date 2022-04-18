import { GET_ARTIST, GET_TITLES } from "../store/posts/actionTypes";
import {
  DiscogsArtist,
  GetArtistRequest,
  GetTitleRequest,
  PostMessage,
  TitleAndHeadlines,
} from "../types";
import * as api from "./api";

/* chrome.runtime.sendMessage({
  title: "HELLO",
  headlines: ["smokey"],
} as TitleAndHeadlines); */

const messagesFromReactAppListener = (
  msg: PostMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: TitleAndHeadlines | DiscogsArtist) => void
) => {
  if (msg.type === GET_ARTIST) fetchArtist(msg, sendResponse);

  if (msg.type === GET_TITLES)
    extractTitleAndHeaders(msg, sender, sendResponse);

  if ((msg.type as any) === "GET_FOLDERS") fetchFolders(sendResponse);
  return true;
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

function extractTitleAndHeaders(
  msg: GetTitleRequest,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: TitleAndHeadlines) => void
) {
  const response: TitleAndHeadlines = {
    title: document.title,
    headlines: Array.from(document.getElementsByTagName<"h1">("h1")).map(
      (h1) => h1.innerText
    ),
  };
  console.log("[content.js]. Message received", msg, sender);
  sendResponse(response);
}

const fetchArtist = (
  { artist }: GetArtistRequest,
  sendResponse: (response: DiscogsArtist) => void
) =>
  api
    .fetchArtist(artist)
    .then((results) => sendResponse({ artist: artist, results }));

const fetchFolders = (sendResponse: (response: any) => void) =>
  api.fetchFolders().then((user) => sendResponse({ user }));
