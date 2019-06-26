import { sessionService } from "redux-react-session";
import * as types from "./index";

import { loginUserService } from "../services/authenticationService";
import { setMessageError } from "./errorActions";

export const registerUserAction = user => {
  return {
    type: types.REGISTER_USER,
    user
  };
};

export const setUserData = (user, history) => {
  const { access_token } = user;
  sessionService
    .saveSession({ access_token })
    .then(() => {
      sessionService
        .saveUser(user)
        .then(() => {
          history.push("/admin/home");
        })
        .catch(err => console.error("save user", err));
    })
    .catch(err => console.error("save error", err));
  return {
    type: types.DATA_USER,
    user
  };
};

export const loginUserAction = (user, history) => {
  return dispatch => {
    loginUserService(user).then(userInfo => {
      if (userInfo.data.message) {
        dispatch(setMessageError(userInfo.data.message));
      } else {
        dispatch(setUserData(userInfo.data[0], history));
        dispatch(setMessageError(null));
      }
    });
  };
};

export const login = (user, history) => {
  return () => {
    return loginUserService(user).then(response => {
      const { token } = response;
      sessionService
        .saveSession({ token })
        .then(() => {
          sessionService
            .saveUser(response.data)
            .then(() => {
              history.push("/");
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    });
  };
};
