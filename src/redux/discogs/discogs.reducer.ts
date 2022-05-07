import { reducerForProducers, writeToDraft } from "../utils";
import { DiscogsActions, DiscogsActionTypes, DiscogsState } from "./types";

export const initialState: DiscogsState = {
  artist: undefined,
  artistResult: [],
  folders: [],
  wantList: [],
  fields: [],
};

const discogsReducer = reducerForProducers<
  DiscogsState,
  DiscogsActionTypes,
  DiscogsActions
>(initialState, {
  GET_ARTIST: writeToDraft("artist"),
  GET_FOLDERS_SUCCESS: writeToDraft("folders"),
  GET_WANT_LIST_SUCCESS: writeToDraft("wantList"),
  GET_INVENTORY_FIELDS_SUCCESS: writeToDraft("fields"),
});

export default discogsReducer;
