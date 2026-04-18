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
        .catch(function() {
          return { data: null };
        });
    })
    .catch(() => ({ data: null }));
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
        .catch(function() {
          return { data: null };
        });
    })
    .catch(() => ({ data: null }));
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
        .catch(function() {
          return { data: null };
        });
    })
    .catch(() => ({ data: null }));
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
        .catch(function() {
          return { data: null };
        });
    })
    .catch(() => ({ data: null }));
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
        .catch(function() {
          return { data: null };
        });
    })
    .catch(() => ({ data: null }));
};

export const getSellersProfiles = async () => {
  try {
    const currentSession = await sessionService.loadSession();
    const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/sellers`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.get(PROFILE_API_ENDPOINT, data);
      return response;
    } catch (error) {
      return { data: null };
    }
  } catch (err) {
    return { data: null };
  }
};
