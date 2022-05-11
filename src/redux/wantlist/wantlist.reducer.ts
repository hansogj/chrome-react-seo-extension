import { reducerForProducers, writeToDraft } from "../utils";
import { WantListActions, WantListActionTypes, WantListState } from "./types";

export const initialState: WantListState = {
  wantList: [],
};

const wantlistReducer = reducerForProducers<
  WantListState,
  WantListActionTypes,
  WantListActions
>(initialState, {
  GET_WANT_LIST_SUCCESS: writeToDraft("wantList"),
});

export default wantlistReducer;
