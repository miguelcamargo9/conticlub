import * as types from "./index";
import { userService, getUserByIdService } from "../services/userService";

export const setUserData = dataProduct => {
  return {
    type: types.GET_PRODS,
    payload: {
      dataProduct
    }
  };
};

export const getProductsAction = () => {
  return dispatch => {
    userService().then(dataProduct => {
      // let output = dataProduct.data.slice(0, 12);
      dispatch(setUserData(dataProduct.data));
    });
  };
};

export const getUserById = idUser => {
  return dispatch => {
    getUserByIdService(idUser).then(dataUser => {
      // let output = dataProduct.data.slice(0, 12);
      dispatch(setUserData(dataProduct.data));
    });
  };
};
