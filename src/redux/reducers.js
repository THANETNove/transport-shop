import { combineReducers } from "redux";
import authReducer from "./auth";
import postsReducer from "./posts";
import destroyReducer from "./destroy";

export default combineReducers({
  auth: authReducer,
  post: postsReducer,
  destroy: destroyReducer,
});
