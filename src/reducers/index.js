import { combineReducers } from "redux";
import register from "./registerReducer";
import login from "./loginReducer";
import slide from "./slideReducer";
import product from "./productReducer";

const rootReducer = combineReducers({
  register,
  login,
  slide,
  product
});

export default rootReducer;
