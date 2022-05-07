import { ActionTypes } from "../../redux";
import { DiscogsActions } from "../../redux/discogs";
import * as api from "./api";
import domResolver from "./dom";
import { MessageActions } from "./types";
import wantListService from "./wantlist.service";
const service = wantListService();

const messagesFromReactAppListener = (
  action: ActionTypes,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: unknown) => void
) => {
  debugger;
  console.log("message received_ ", action);
  const resolve = (prom: Promise<unknown>) => prom.then(sendResponse);
  if (action.type === MessageActions.fetch)
    resolve(api.fetch(action.resource!, action.body as SearchParams));

  if (action.type === MessageActions.setUserToken)
    resolve(api.setUserToken(action.body as string));

  if (action.type === MessageActions.DOM)
    resolve(domResolver(action.body as DiscogsActions));

  if (action.type === MessageActions.GET_WANT_LIST) resolve(service.get());
  if (action.type === MessageActions.SYNC_WANT_LIST)
    resolve(service.sync(action.body as string));

  return true;
};

chrome &&
  chrome.runtime &&
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
