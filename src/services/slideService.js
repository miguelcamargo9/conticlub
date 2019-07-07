import axios from "axios";
import { sessionService } from "redux-react-session";

import { SERVER_URL } from "../constants/server";

export const slideService = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/slides/all`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
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
    })
    .catch(err => console.log(err));
};
