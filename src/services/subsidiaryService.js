import axios from "axios";
import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";
import { sessionService } from "redux-react-session";

export const getSubsidiariesService = () => {
  const API_ENDPOINT = `${SERVER_URL}/api/subsidiary/all`;

  const data = {
    headers: {
      Authorization: serviceConst.CLIENT_SECRET
    }
  };

  return axios
    .get(API_ENDPOINT, data)
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const insertSubsidiary = subsidiaryData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/subsidiary/create`;
      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const data = {
        name: subsidiaryData.subsidiaryName,
        cities_id: subsidiaryData.cityId,
        profiles_id: subsidiaryData.profileId
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

export const deleteSubsidiaryService = subsidiaryId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const SUBSIDIARY_API_ENDPOINT = `${SERVER_URL}/api/subsidiary/delete/${subsidiaryId}`;

      const dataSubsidary = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .delete(SUBSIDIARY_API_ENDPOINT, dataSubsidary)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
