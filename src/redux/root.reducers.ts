import { combineReducers } from "redux";

import { reducer as Discogs } from "./discogs";

const rootReducer = combineReducers({
  Discogs,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
