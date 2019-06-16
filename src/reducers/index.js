import { combineReducers } from "redux";
import register from "./registerReducer";
import login from "./loginReducer";
import slide from "./slideReducer";
import product from "./productReducer";
import subsidiary from "./subsidiaryReducer";

const rootReducer = combineReducers({
  register,
  login,
  slide,
  product,
  subsidiary
});

export default rootReducer;
