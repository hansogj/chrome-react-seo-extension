import { ActionTypes } from "../redux";
import * as api from "./api";
import { MessageActions } from "./types";

const messagesFromReactAppListener = (
  action: ActionTypes,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: unknown) => void
) => {
  debugger;
  console.log("message received_ ", action);
  const resolve = (prom: Promise<any>) => prom.then(sendResponse);
  if (action.type === MessageActions.fetch)
    resolve(api.fetch(action.resource!, action.body));

  if (action.type === MessageActions.setUserToken)
    resolve(api.setUserToken(action.body?.userToken as string));

  return true;
};

chrome &&
  chrome.runtime &&
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
