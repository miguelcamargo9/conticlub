import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getDesignsByBrandId = brandId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/design/byBrand/${brandId}`;

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

export const getDesignsService = async () => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/design`;

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

export const getDesignById = async designId => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/design/${designId}`;

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

export const createDesignService = async design => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/design`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.post(DESIGN_API_ENDPOINT, design, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateDesignService = async design => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/design/${design.id}`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.put(DESIGN_API_ENDPOINT, design, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteDesignService = async designId => {
  try {
    const currentSession = await sessionService.loadSession();
    const DESIGN_API_ENDPOINT = `${SERVER_URL}/api/design/${designId}`;

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
