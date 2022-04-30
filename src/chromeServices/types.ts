import { ResourceUrl } from "../api/domain";
import { ActionTypes } from "../redux/types";

export interface MessageActionData {
  body?: SearchParams;
  resource: ResourceUrl;
}

export enum MessageActions {
  fetch = "FETCH",
  post = "POST",
  setUserToken = "SET_USER_TOKEN",
}

export type MessageActionTypes = ActionTypes<MessageActions, MessageActionData>;
