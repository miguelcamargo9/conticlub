import axios from "axios";
import { sessionService } from "redux-react-session";

import { SERVER_URL } from "../constants/server";

export const getSlideService = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const SLIDE_API_ENDPOINT = `${SERVER_URL}/api/slides/all`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(SLIDE_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getSlideByPositionService = (position, responsive) => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const SLIDE_API_ENDPOINT = `${SERVER_URL}/api/slides/position/${position}/${responsive}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(SLIDE_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const deleteSlideService = slideId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const SLIDE_API_ENDPOINT = `${SERVER_URL}/api/slides/delete/${slideId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .delete(SLIDE_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const insertSlideService = slideData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const SLIDE_API_ENDPOINT = `${SERVER_URL}/api/slides/create`;

      let formData = new FormData();

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const data = {
        position: slideData.position.value,
        order: slideData.order,
        responsive: slideData.responsive,
        show: 1
      };

      formData.append("data", JSON.stringify(data));
      formData.append("image", slideData.image, slideData.image.name);

      return axios
        .post(SLIDE_API_ENDPOINT, formData, { headers: headers })
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
