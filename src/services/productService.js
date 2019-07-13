import axios from "axios";
import { sessionService } from "redux-react-session";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const productService = () => {
  const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/products/all`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(PRODUCT_API_ENDPOINT, data)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getProductsByCategoryIdService = idCategory => {
  const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/products/byCategory/${idCategory}`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(PRODUCT_API_ENDPOINT, data)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const updateProduct = productData => {
  const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/products/update/${
    productData.id
  }`;

  let formData = new FormData();

  const headers = {
    Authorization: serviceConst.AUTH,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const data = {
    name: productData.name,
    points: productData.points,
    product_categories_id: productData.category,
    points_value: productData.points_value,
    estimated_value: productData.estimated_value
  };

  console.log("data", data);
  formData.append("data", JSON.stringify(data));
  if (productData.image) {
    formData.append("image", productData.image, productData.image.name);
  }

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

export const redeemProductService = idProduct => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/product/applyfor`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };

      const data = {
        product_id: idProduct
      };

      return axios
        .post(PRODUCT_API_ENDPOINT, data, { headers: headers })
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getProductByIdService = idProduct => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const PRODUCT_API_ENDPOINT = `${SERVER_URL}/api/products/get/${idProduct}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(PRODUCT_API_ENDPOINT, data)
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
