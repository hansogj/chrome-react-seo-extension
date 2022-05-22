import { SelectedFields } from "../../domain/Inventory";
import { ActionTypes } from "../../redux";
import { DiscogsActions } from "../../redux/discogs";
import * as api from "./api";
import domResolver from "./dom";
import { releasePage } from "./release.page";
import fieldsService from "./selectedFields.service";
import { MessageActions } from "./types";
import wantListService from "./wantlist.service";

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
    return resolver(api.fetch(action.resource!, action.body as SearchParams));

  if (action.type === MessageActions.post) {
    return resolver(
      api.post(action.resource!, action.body as SearchParams & PayLoad)
    );
  }

  if (action.type === MessageActions.setUserToken)
    return resolver(api.setUserToken(action.body as string));

  if (action.type === MessageActions.DOM)
    return resolver(domResolver(action.body as DiscogsActions));

  if (action.type === MessageActions.GET_WANT_LIST)
    return resolver(services.wantList.get(action.userId as number));
  if (action.type === MessageActions.SYNC_WANT_LIST)
    return resolver(
      services.wantList.sync(action.userId as number, action.body as string)
    );

  if (action.type === MessageActions.GET_SELECTED_FIELDS)
    return resolver(services.fields.get(action.userId as number));
  if (action.type === MessageActions.SET_SELECTED_FIELDS)
    return resolver(
      services.fields.set(
        action.userId as number,
        action.body as SelectedFields
      )
    );

  if (action.type === MessageActions.GET_RELEASE_PAGE_ITEM_ID)
    return resolver(releasePage(action.resource!));

  if (action.type === MessageActions.WINDOW_RELOAD) window.location.reload();
};

chrome &&
  chrome.runtime &&
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
