import { combineReducers } from "redux";
import register from "./registerReducer";
import login from "./loginReducer";
import slide from "./slideReducer";
import subsidiary from "./subsidiaryReducer";

const rootReducer = combineReducers({
  register,
  login,
  slide,
  subsidiary
});

export default rootReducer;
