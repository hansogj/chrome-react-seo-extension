import { ActionTypes } from "../../redux";
import { DiscogsActions } from "../../redux/discogs";
import * as api from "./api";
import domResolver from "./dom";
import { MessageActions } from "./types";
import wantListService from "./wantlist.service";
import fieldsService from "./selectedFields.service";
import { SelectedFields } from "../../domain/Inventory";
import { masterRelease } from "./master.release";

const services = {
  wantList: wantListService(),
  fields: fieldsService(),
};

const messagesFromReactAppListener = (
  action: ActionTypes,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: unknown) => void
) => {
  console.log("message received_ ", action);
  const resolver = (prom: Promise<unknown>) =>
    prom.then(sendResponse).catch((error) => sendResponse({ error }));
  messageResolver(action, resolver);
  return true;
};

export const messageResolver = (
  action: ActionTypes,
  resolver: (prom: Promise<unknown>) => Promise<unknown>
) => {
  if (action.type === MessageActions.fetch)
    resolver(api.fetch(action.resource!, action.body as SearchParams));

  if (action.type === MessageActions.post) {
    resolver(api.post(action.resource!, action.body as SearchParams & PayLoad));
  }

  if (action.type === MessageActions.setUserToken)
    resolver(api.setUserToken(action.body as string));

  if (action.type === MessageActions.DOM)
    resolver(domResolver(action.body as DiscogsActions));

  if (action.type === MessageActions.GET_WANT_LIST)
    resolver(services.wantList.get());
  if (action.type === MessageActions.SYNC_WANT_LIST)
    resolver(services.wantList.sync(action.body as string));

  if (action.type === MessageActions.GET_SELECTED_FIELDS)
    resolver(services.fields.get());
  if (action.type === MessageActions.SET_SELECTED_FIELDS)
    resolver(services.fields.set(action.body as SelectedFields));

  if (action.type === MessageActions.GET_CURRENT_MASTER_ID)
    return resolver(masterRelease(action.resource!));
};

chrome &&
  chrome.runtime &&
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
