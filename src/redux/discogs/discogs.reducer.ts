import { reducerForProducers, writeToDraft } from "../utils";
import { DiscogsActions, DiscogsActionTypes, DiscogsState } from "./types";

export const initialState: DiscogsState = {
  artist: undefined,
  artistResult: [],
  error: undefined,
  folders: [],
  user: undefined,
};

const discogsReducer = reducerForProducers<
  DiscogsState,
  DiscogsActionTypes,
  DiscogsActions
>(initialState, {
  GET_ARTIST: writeToDraft("artist"),
  GET_USER_SUCCESS: writeToDraft("user"),
  GET_FOLDERS_SUCCESS: writeToDraft("folders"),
});

export default discogsReducer;
