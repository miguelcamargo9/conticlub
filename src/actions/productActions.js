import * as types from "./index";
import { productService } from "../services/productService";

// utils

// import { SERVER_URL } from "../constants/server";

export const setPictureData = dataProduct => {
  // const paths = dataPicture.map(picture => {
  //   return SERVER_URL + picture.path;
  // });
  return {
    type: types.GET_PRODS,
    payload: {
      dataProduct
    }
  };
};

export const getProductsAction = () => {
  return dispatch => {
    productService().then(dataProduct => {
      dispatch(setPictureData(dataProduct));
    });
  };
};
