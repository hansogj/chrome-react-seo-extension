import { ResourceUrl } from "../../domain";
import { ActionTypes } from "../../redux/types";

export interface MessageActionData {
  body?: unknown;
  resource: ResourceUrl;
  userId?: number;
}

export enum MessageActions {
  fetch = "FETCH",
  post = "POST",
  setUserToken = "SET_USER_TOKEN",
  DOM = "DOM",

  GET_WANT_LIST = "GET_WANT_LIST",
  SYNC_WANT_LIST = "SYNC_WANT_LIST",

  GET_SELECTED_FIELDS = "GET_SELECTED_FIELDS",
  SET_SELECTED_FIELDS = "SET_SELECTED_FIELDS",

  GET_RELEASE_PAGE_ITEM_ID = "GET_RELEASE_PAGE_ITEM_ID",

  SET_VIEW = "SET_VIEW",
  GET_VIEW = "GET_VIEW",
}

export type MessageActionTypes = ActionTypes<MessageActions, MessageActionData>;
