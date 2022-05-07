import { combineReducers } from "redux";

import { reducer as Discogs } from "./discogs";
import { reducer as App } from "./app";

const rootReducer = combineReducers({
  Discogs,
  App,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
