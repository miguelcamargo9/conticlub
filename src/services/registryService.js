import axios from "axios";
import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const createUserService = request => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/users/create`;

  const headers = {
    Authorization: serviceConst.AUTH
  };
  const data = {
    name: request.username,
    password: request.password,
    email: request.email,
    phone: "3004223675",
    identification_number: request.identification_number,
    subsidiary_id: request.subsidiary
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
