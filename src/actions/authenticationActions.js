import * as types from './index';
import { loginUserService } from '../services/authenticationService'

export const registerUserAction = (user) => {
  return {
    type: types.REGISTER_USER,
    user
  }
};

export const setUserData = (user) => {
  return {
    type: types.DATA_USER,
    user
  }
};

export const loginUserAction = (user) => {
  return (dispatch) => {
    loginUserService(user).then(userInfo => {
      dispatch(setUserData(userInfo));
    })
  }
};
