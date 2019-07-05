import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const insertProfile = profileData => {
  const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/create`;

  const headers = {
    Authorization: serviceConst.AUTH
  };
  const dataProfile = {
    name: profileData.name
  };

  return axios
    .post(PROFILE_API_ENDPOINT, dataProfile, { headers: headers })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const updateProfile = profileData => {
  const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/update/${
    profileData.id
  }`;

  const headers = {
    Authorization: serviceConst.AUTH
  };
  const dataProfile = {
    name: profileData.name
  };

  return axios
    .put(PROFILE_API_ENDPOINT, dataProfile, { headers: headers })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getProfileById = profileId => {
  const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/get/${profileId}`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(PROFILE_API_ENDPOINT, data)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getProfiles = () => {
  const PROFILE_API_ENDPOINT = `${SERVER_URL}/api/profiles/all`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(PROFILE_API_ENDPOINT, data)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
