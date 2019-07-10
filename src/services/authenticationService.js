import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

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
