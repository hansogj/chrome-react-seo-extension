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
  const resolve = (prom: Promise<unknown>) => prom.then(sendResponse);
  if (action.type === MessageActions.fetch)
    resolve(api.fetch(action.resource!, action.body as SearchParams));

  if (action.type === MessageActions.setUserToken)
    resolve(api.setUserToken(action.body as string));

  if (action.type === MessageActions.DOM)
    resolve(domResolver(action.body as DiscogsActions));

  if (action.type === MessageActions.GET_WANT_LIST)
    resolve(services.wantList.get());
  if (action.type === MessageActions.SYNC_WANT_LIST)
    resolve(services.wantList.sync(action.body as string));

  if (action.type === MessageActions.GET_SELECTED_FIELDS)
    resolve(services.fields.get());
  if (action.type === MessageActions.SET_SELECTED_FIELDS)
    resolve(services.fields.set(action.body as SelectedFields));

  if (action.type === MessageActions.GET_CURRENT_MASTER_ID)
    resolve(masterRelease());

  return true;
};

chrome &&
  chrome.runtime &&
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
