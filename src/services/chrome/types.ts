import { ResourceUrl } from "../../domain";
import { ActionTypes } from "../../redux/types";

export interface MessageActionData {
  body?: unknown;
  resource: ResourceUrl;
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
  GET_CURRENT_MASTER_ID = "GET_CURRENT_MASTER_ID",
}

export type MessageActionTypes = ActionTypes<MessageActions, MessageActionData>;
