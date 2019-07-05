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
      console.log(response);
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
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
