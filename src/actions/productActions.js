import * as types from "./index";
import {
  productService,
  getProductsByCategoryIdService
} from "../services/productService";

export const setPictureData = dataProduct => {
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
      if (!dataProduct || !dataProduct.data) return;
      dispatch(setPictureData(dataProduct.data));
    });
  };
};

export const getProductsByCategoryId = idCategory => {
  return dispatch => {
    getProductsByCategoryIdService(idCategory).then(dataProduct => {
      if (!dataProduct || !dataProduct.data) return;
      dispatch(setPictureData(dataProduct.data));
    });
  };
};
