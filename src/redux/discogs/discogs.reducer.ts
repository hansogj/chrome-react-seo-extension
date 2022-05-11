import { ReleaseInView } from "../../domain";
import { reducerForProducers, writeToDraft } from "../utils";
import { DiscogsActions, DiscogsActionTypes, DiscogsState } from "./types";

export const initialState: DiscogsState = {
  folders: [],
  fields: [],
  selectedFields: {},
  releaseInView: {} as ReleaseInView,
};

const discogsReducer = reducerForProducers<
  DiscogsState,
  DiscogsActionTypes,
  DiscogsActions
>(initialState, {
  GET_FOLDERS_SUCCESS: writeToDraft("folders"),
  GET_INVENTORY_FIELDS_SUCCESS: writeToDraft("fields"),
  GET_CURRENT_MASTER_SUCCESS: writeToDraft("releaseInView"),
  SET_SELECTED_FIELDS_SUCCESS: writeToDraft("selectedFields"),
});

export default discogsReducer;
