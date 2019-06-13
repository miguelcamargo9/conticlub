import { combineReducers } from "redux";
import register from "./registerReducer";
import login from "./loginReducer";
import slide from "./slideReducer";

const rootReducer = combineReducers({
  register,
  login,
  slide
});

export default rootReducer;
