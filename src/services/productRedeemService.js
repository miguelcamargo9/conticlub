import axios from "axios";
import { sessionService } from "redux-react-session";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const approveRedeemService = redeemId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/approve/${redeemId}`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };

      return axios
        .post(REDEEM_API_ENDPOINT, null, { headers: headers })
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

export const rejectRedeemService = redeemId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/reject/${redeemId}`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };

      return axios
        .post(REDEEM_API_ENDPOINT, null, { headers: headers })
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

export const getRedeemByIdService = redeemId => {
  const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/applyfor/get/${redeemId}`;

  const dataRedeem = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(REDEEM_API_ENDPOINT, dataRedeem)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
