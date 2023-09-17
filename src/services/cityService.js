import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getCities = async () => {
  try {
    const currentSession = await sessionService.loadSession();
    const API_ENDPOINT = `${SERVER_URL}/api/city`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.get(API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCity = async id => {
  try {
    const currentSession = await sessionService.loadSession();
    const API_ENDPOINT = `${SERVER_URL}/api/city/${id}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.get(API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const createCity = async city => {
  try {
    const currentSession = await sessionService.loadSession();
    const API_ENDPOINT = `${SERVER_URL}/api/city`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.post(API_ENDPOINT, city, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateCity = async city => {
  try {
    const currentSession = await sessionService.loadSession();
    const API_ENDPOINT = `${SERVER_URL}/api/city/${city.id}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.put(API_ENDPOINT, city, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCityService = async id => {
  try {
    const currentSession = await sessionService.loadSession();
    const API_ENDPOINT = `${SERVER_URL}/api/city/${id}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.delete(API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};
