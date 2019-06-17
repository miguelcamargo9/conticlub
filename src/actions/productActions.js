import * as types from "./index";
import { productService } from "../services/productService";

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
      let output = dataProduct.data.slice(0, 16);
      dispatch(setPictureData(output));
    });
  };
};
