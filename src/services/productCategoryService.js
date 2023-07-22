import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getCategoriesService = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/products/categories/all`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const insertCategory = categoryData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/product/category/create`;
      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const data = {
        name: categoryData.categoryText
      };

      return axios
        .post(API_ENDPOINT, data, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const updateCategory = categoryData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const CATEGORY_API_ENDPOINT = `${SERVER_URL}/api/product/category/update/${
        categoryData.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
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
    })
    .catch(err => console.log(err));
};

export const deleteProductCategoryService = categoryId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const CATEGORY_API_ENDPOINT = `${SERVER_URL}/api/product/category/delete/${categoryId}`;

      const dataCategory = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
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
    })
    .catch(err => console.log(err));
};

export const getCategoryById = categoryId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const CATEGORY_API_ENDPOINT = `${SERVER_URL}/api/product/category/get/${categoryId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
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
    })
    .catch(err => console.log(err));
};
