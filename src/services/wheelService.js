import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getWheelsByDesignId = designId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/tire/byDesign/${designId}`;

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
