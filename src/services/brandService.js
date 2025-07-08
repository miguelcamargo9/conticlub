import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getBrands = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/brand/all`;

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

export const insertBrand = brandData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const BRAND_API_ENDPOINT = `${SERVER_URL}/api/brand/create`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const dataBrand = {
        name: brandData.name
      };

      return axios
        .post(BRAND_API_ENDPOINT, dataBrand, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const updateBrand = brandData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const BRAND_API_ENDPOINT = `${SERVER_URL}/api/brand/update/${
        brandData.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const dataBrand = {
        name: brandData.name
      };

      return axios
        .put(BRAND_API_ENDPOINT, dataBrand, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const deleteBrandService = brandId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const BRAND_API_ENDPOINT = `${SERVER_URL}/api/brand/delete/${brandId}`;

      const dataBrand = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .delete(BRAND_API_ENDPOINT, dataBrand)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getBrandById = brandId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const BRAND_API_ENDPOINT = `${SERVER_URL}/api/brand/get/${brandId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(BRAND_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
