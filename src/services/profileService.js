import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const insertProfile = profileData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/create`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const dataProfile = {
        name: profileData.name
      };

      return axios
        .post(PROFILE_API_ENDPOINT, dataProfile, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const updateProfile = profileData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/update/${
        profileData.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const dataProfile = {
        name: profileData.name
      };

      return axios
        .put(PROFILE_API_ENDPOINT, dataProfile, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const deleteProfileService = profileId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/delete/${profileId}`;

      const dataProfile = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .delete(PROFILE_API_ENDPOINT, dataProfile)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getProfileById = profileId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/get/${profileId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(PROFILE_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getProfiles = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/all`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(PROFILE_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
