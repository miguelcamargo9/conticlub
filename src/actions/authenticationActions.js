import { sessionService } from "redux-react-session";
import * as types from "./index";

import { loginUserService } from "../services/authenticationService";

import { setMessageError } from "./errorActions";
import { setPoints } from "./sessionActions";

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
        dispatch(setPoints(userInfo.data[0].points));
        dispatch(setUserData(userInfo.data[0], history));
        dispatch(setMessageError(null));
      }
    });
  };
};

export const logoutUserAction = history => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push("/auth/login-page");
  };
};
