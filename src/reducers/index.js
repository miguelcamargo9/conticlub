import { combineReducers } from "redux";
import register from "./registerReducer";
import login from "./loginReducer";
import slide from "./slideReducer";
import product from "./productReducer";
import user from "./userReducer";
import subsidiary from "./subsidiaryReducer";
import error from "./errorReducer";

const rootReducer = combineReducers({
  register,
  login,
  slide,
  product,
  subsidiary,
  user,
  error
});

export default rootReducer;
