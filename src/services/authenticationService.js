import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const registerUserService = request => {
  const REGISTER_API_ENDPOINT = "http://localhost:4000/api/v1/register";

  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request.user)
  };

  return fetch(REGISTER_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

export const loginUserService = request => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/login`;

  const data = {
    username: request.username,
    password: request.password,
    grant_type: serviceConst.GRANT_TYPE,
    client_id: serviceConst.CLIENT_ID,
    client_secret: serviceConst.CLIENT_SECRET
  };

  return axios
    .post(LOGIN_API_ENDPOINT, data)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
