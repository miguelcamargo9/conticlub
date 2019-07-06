import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const productService = () => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/products/all`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(LOGIN_API_ENDPOINT, data)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getProductsByCategoryIdService = idCategory => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/products/byCategory/${idCategory}`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(LOGIN_API_ENDPOINT, data)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const updateProduct = productData => {
  const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/product/update/${
    productData.id
  }`;

  const headers = {
    Authorization: serviceConst.AUTH
  };
  const dataCategory = {
    name: productData.name
  };

  return axios
    .put(PRODUCT_API_ENDPOINT, dataCategory, { headers: headers })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const deleteProductService = productId => {
  const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/product/delete/${productId}`;

  const dataProduct = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .delete(PRODUCT_API_ENDPOINT, dataProduct)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
