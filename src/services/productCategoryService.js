import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const getCategoriesService = () => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/products/categories/all`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(LOGIN_API_ENDPOINT, data)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const insertCategory = categoryData => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/product/category/create`;
  const headers = {
    Authorization: serviceConst.AUTH
  };
  const data = {
    name: categoryData.categoryText
  };

  return axios
    .post(LOGIN_API_ENDPOINT, data, { headers: headers })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const updateCategory = categoryData => {
  const CATEGORY_API_ENDPOINT = `${SERVER_URL}/api/product/category/update/${
    categoryData.id
  }`;

  const headers = {
    Authorization: serviceConst.AUTH
  };
  const dataCategory = {
    name: categoryData.name
  };

  return axios
    .put(CATEGORY_API_ENDPOINT, dataCategory, { headers: headers })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const deleteProductCategoryService = categoryId => {
  const CATEGORY_API_ENDPOINT = `${SERVER_URL}/api/product/category/delete/${categoryId}`;

  const dataCategory = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .delete(CATEGORY_API_ENDPOINT, dataCategory)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getCategoryById = categoryId => {
  const CATEGORY_API_ENDPOINT = `${SERVER_URL}/api/product/category/get/${categoryId}`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(CATEGORY_API_ENDPOINT, data)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
