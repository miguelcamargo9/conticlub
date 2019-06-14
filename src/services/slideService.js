import axios from "axios";
import * as serviceConst from "./index";

export const slideService = () => {
  const LOGIN_API_ENDPOINT = "http://conticlub.co:8000/api/slides/all";

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
