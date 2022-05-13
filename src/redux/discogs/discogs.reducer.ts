import { ReleaseInView } from "../../domain";
import { reducerForProducers, writeToDraft } from "../utils";
import { DiscogsActions, DiscogsActionTypes, DiscogsState } from "./types";

export const initialState: DiscogsState = {
  releaseInView: {} as ReleaseInView,
};

const discogsReducer = reducerForProducers<
  DiscogsState,
  DiscogsActionTypes,
  DiscogsActions
>(initialState, {
  GET_CURRENT_MASTER_SUCCESS: writeToDraft("releaseInView"),
});

export default discogsReducer;
