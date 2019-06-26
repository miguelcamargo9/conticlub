import { createStore, applyMiddleware } from "redux";
import { sessionService } from "redux-react-session";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers";

const configureStore = () => {
  return {
    ...createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(logger, thunk))
    )
  };
};
sessionService
  .initSessionService(configureStore)
  .then(() =>
    console.log(
      "Redux React Session is ready and a session was refreshed from your storage"
    )
  )
  .catch(() =>
    console.log(
      "Redux React Session is ready and there is no session in your storage"
    )
  );
export default configureStore;
