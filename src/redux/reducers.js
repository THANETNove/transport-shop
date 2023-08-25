import { combineReducers } from "redux";
import authReducer from "./auth";
import postsReducer from "./posts";
import destroyReducer from "./destroy";
import getReducer from "./get";

export default combineReducers({
  auth: authReducer,
  post: postsReducer,
  destroy: destroyReducer,
  get: getReducer,
});
