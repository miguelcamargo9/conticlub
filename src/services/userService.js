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

export const getUserByIdService = userId => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/users/getuser/${userId}`;

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

export const updateUserService = request => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/users/update/${request.id}`;

  let formData = new FormData();

  const headers = {
    Authorization: serviceConst.AUTH,
    "Content-Type": "application/x-www-form-urlencoded"
  };

  var finalData = {};
  const data = {
    name: request.name,
    email: request.email,
    phone: request.phone,
    points: request.points,
    state: request.state,
    profiles_id: request.profiles_id,
    subsidiary_id: request.subsidiary_id
  };
  if (request.password) {
    finalData = {
      ...data,
      password: request.password
    };
  } else {
    finalData = data;
  }
  formData.append("data", JSON.stringify(finalData));
  if (request.image) {
    formData.append("image", request.image, request.image.name);
  }

  return axios
    .post(LOGIN_API_ENDPOINT, formData, { headers: headers })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const createUserService = request => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/users/create`;

  let formData = new FormData();

  const headers = {
    Authorization: serviceConst.AUTH,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const data = {
    name: request.username,
    password: request.password,
    email: request.email,
    phone: request.phone,
    identification_number: request.identification_number,
    subsidiary_id: request.subsidiary_id,
    profiles_id: request.profiles_id
  };

  formData.append("data", JSON.stringify(data));
  if (request.image) {
    formData.append("image", request.image, request.image.name);
  }

  return axios
    .post(LOGIN_API_ENDPOINT, formData, { headers: headers })
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
