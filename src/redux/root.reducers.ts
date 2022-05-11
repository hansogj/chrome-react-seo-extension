import { combineReducers } from "redux";

import { reducer as Discogs } from "./discogs";
import { reducer as App } from "./app";
import { reducer as WantList } from "./wantlist";

const rootReducer = combineReducers({
  Discogs,
  App,
  WantList,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
