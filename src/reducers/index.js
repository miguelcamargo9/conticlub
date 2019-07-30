import { combineReducers } from "redux";
import register from "./registerReducer";
import login from "./loginReducer";
import slide from "./slideReducer";
import product from "./productReducer";
import user from "./userReducer";
import subsidiary from "./subsidiaryReducer";
import error from "./errorReducer";
import msg from "./msgReducer";
import localSession from "./localSessionReducer";
import invoice from "./invoiceReducer";
import { sessionReducer } from "redux-react-session";

const rootReducer = combineReducers({
  register,
  login,
  slide,
  product,
  subsidiary,
  user,
  error,
  msg,
  session: sessionReducer,
  localSession,
  invoice
});

export default rootReducer;
