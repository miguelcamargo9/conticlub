import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers";

const configureStore = () => {
  return {
    ...createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(logger, thunkMiddleware))
    )
  };
};

export default configureStore;
