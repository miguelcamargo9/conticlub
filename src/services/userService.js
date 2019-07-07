import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const userService = () => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/users/all`;

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

export const getInvoiceHistoryByUserService = userId => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/users/historyinvoice/${userId}`;

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

export const getRedeemListService = () => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/product/applyfor/all`;

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

export const getRedeemListByUserIdService = userId => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/product/applyfor/getbyuser/${userId}`;

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
