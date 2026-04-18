import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getTiresByDesigndId = designId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/tire/byDesign/${designId}`;

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
        .catch(function() {
          return { data: null };
        });
    })
    .catch(() => ({ data: null }));
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
      return { data: null };
    }
  } catch (err) {
    return { data: null };
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
      return { data: null };
    }
  } catch (err) {
    return { data: null };
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
      return { data: null };
    }
  } catch (err) {
    return { data: null };
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
      return { data: null };
    }
  } catch (err) {
    return { data: null };
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
      return { data: null };
    }
  } catch (err) {
    return { data: null };
  }
};
