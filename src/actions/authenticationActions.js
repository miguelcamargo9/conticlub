import * as types from "./index";

import { loginUserService } from "../services/authenticationService";
import { setMessageError } from "./errorActions";

export const registerUserAction = user => {
  return {
    type: types.REGISTER_USER,
    user
  };
};

export const setUserData = user => {
  return {
    type: types.DATA_USER,
    user
  };
};

export const loginUserAction = user => {
  return dispatch => {
    loginUserService(user).then(userInfo => {
      if (userInfo.data.message) {
        dispatch(setMessageError(userInfo.data.message));
      } else {
        dispatch(setUserData(userInfo.data[0]));
        dispatch(setMessageError(null));
      }
    });
  };
};
