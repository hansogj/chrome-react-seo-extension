import { combineReducers } from "redux";

import PostReducer, { PostState } from "./posts/reducer";

const rootReducer = combineReducers({
  PostReducer,
});

export default rootReducer;
export type RootState = {
  PostReducer: PostState;
};

//ReturnType<typeof combineReducers>;
