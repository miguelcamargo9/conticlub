import axios from "axios";
import { sessionService } from "redux-react-session";
import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const userService = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/users/all`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getUserByIdService = userId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/users/getuser/${userId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const updateUserService = request => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/users/update/${request.id}`;

      let formData = new FormData();

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      };

      var finalData = {};
      const data = {
        name: request.name,
        email: request.email,
        phone: request.phone,
        points: request.points,
        state: request.state,
        profiles_id: request.profiles_id
      };

      if (request.password) {
        if (request.subsidiary_id) {
          finalData = {
            ...data,
            password: request.password,
            subsidiary_id: request.subsidiary_id
          };
        } else {
          finalData = {
            ...data,
            password: request.password
          };
        }
      } else {
        if (request.subsidiary_id) {
          finalData = {
            ...data,
            subsidiary_id: request.subsidiary_id
          };
        } else {
          finalData = data;
        }
      }

      formData.append("data", JSON.stringify(finalData));

      if (request.image) {
        formData.append("image", request.image, request.image.name);
      }

      return axios
        .post(API_ENDPOINT, formData, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const createUserService = request => {
  const API_ENDPOINT = `${SERVER_URL}/api/users/create`;

  let formData = new FormData();

  const headers = {
    Authorization: serviceConst.CLIENT_SECRET,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const data = {
    name: request.username,
    password: request.password,
    email: request.email,
    phone: request.phone,
    identification_number: request.identification_number,
    subsidiary_id: request.subsidiary_id,
    profiles_id: request.profiles_id
  };

  formData.append("data", JSON.stringify(data));
  if (request.image) {
    formData.append("image", request.image, request.image.name);
  }

  return axios
    .post(API_ENDPOINT, formData, { headers: headers })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getInvoiceHistoryByUserService = userId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/users/historyinvoice/${userId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getRedeemListService = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/product/applyfor/all`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getRedeemListByUserIdService = userId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/product/applyfor/getbyuser/${userId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
