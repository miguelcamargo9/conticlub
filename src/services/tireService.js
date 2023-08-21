import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getTiresByBrandId = brandId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/tire/byBrand/${brandId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(DESIGN_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getTiresService = async () => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/tire`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.get(DESIGN_API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getTireById = async tireId => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/tire/${tireId}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.get(DESIGN_API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const createTireService = async tire => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/tire`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.post(DESIGN_API_ENDPOINT, tire, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateTireService = async tire => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/tire/${tire.id}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.put(DESIGN_API_ENDPOINT, tire, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteTireService = async tireId => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/tire/${tireId}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.delete(DESIGN_API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};
