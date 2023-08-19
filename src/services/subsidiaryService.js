import axios from "axios";
import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";
import { sessionService } from "redux-react-session";

export const getSubsidiariesService = () => {
  const API_ENDPOINT = `${SERVER_URL}/api/subsidiary`;

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
      const API_ENDPOINT = `${SERVER_URL}/api/subsidiary`;
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

export const updateSubsidiary = subsidiaryData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const SUBSIDIARY_API_ENDPOINT = `${SERVER_URL}/api/subsidiary/${
        subsidiaryData.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const dataSubsidiary = {
        name: subsidiaryData.subsidiaryName,
        cities_id: subsidiaryData.cityId,
        profiles_id: subsidiaryData.profileId
      };

      return axios
        .put(SUBSIDIARY_API_ENDPOINT, dataSubsidiary, { headers: headers })
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
      const SUBSIDIARY_API_ENDPOINT = `${SERVER_URL}/api/subsidiary/${subsidiaryId}`;

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

export const getSubsidiaryById = async subsidiaryId => {
  try {
    const currentSession = await sessionService.loadSession();
    const SUBSIDIARY_API_ENDPOINT = `${SERVER_URL}/api/subsidiary/${subsidiaryId}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.get(SUBSIDIARY_API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};
