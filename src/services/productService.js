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
  const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/products/delete/${productId}`;

  const headers = {
    Authorization: serviceConst.AUTH
  };

  return axios
    .post(PRODUCT_API_ENDPOINT, null, { headers: headers })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const insertProduct = productData => {
  const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/products/create`;

  let formData = new FormData();

  const headers = {
    Authorization: serviceConst.AUTH,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const data = {
    name: productData.name,
    points: productData.points,
    state: "1",
    product_categories_id: productData.productCategoryId,
    points_value: productData.pointsValue,
    estimated_value: productData.estimatedValue
  };

  console.log("data", data);

  formData.append("data", JSON.stringify(data));
  formData.append("image", productData.image, productData.image.name);

  return axios
    .post(PRODUCT_API_ENDPOINT, formData, { headers: headers })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
