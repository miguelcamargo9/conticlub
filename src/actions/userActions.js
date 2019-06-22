import * as types from "./index";
import { userService } from "../services/userService";

export const setUserData = dataUser => {
  return {
    type: types.GET_USERS,
    payload: {
      dataUser
    }
  };
};

export const getUsersAction = () => {
  return dispatch => {
    userService().then(dataUsers => {
      // let output = dataProduct.data.slice(0, 12);
      dispatch(setUserData(dataUsers.data));
    });
  };
};
