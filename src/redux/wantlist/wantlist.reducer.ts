import { reducerForProducers } from "../utils";
import { WantListActions, WantListActionTypes, WantListState } from "./types";

export const initialState: WantListState = {
  wantList: [],
  isSyncing: false,
};

const wantlistReducer = reducerForProducers<
  WantListState,
  WantListActionTypes,
  WantListActions
>(initialState, {
  SYNC_WANT_LIST: (draft) => {
    draft.isSyncing = true;
  },
  GET_WANT_LIST_SUCCESS: (draft, action) => {
    draft.isSyncing = false;
    draft.wantList = action.wantList!;
  },
});

export default wantlistReducer;
