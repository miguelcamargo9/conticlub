import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const approveRedeemService = dataRedeem => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/approve/${
        dataRedeem.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };

      const requestdata = {
        comment: dataRedeem.comment
      };

      return axios
        .post(REDEEM_API_ENDPOINT, requestdata, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const confirmRedeemService = dataRedeem => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/bought/${
        dataRedeem.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };

      const requestdata = {
        buyer_comment: dataRedeem.comment,
        purchase_date: dataRedeem.purchaseDate
      };

      return axios
        .post(REDEEM_API_ENDPOINT, requestdata, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const rejectRedeemService = dataRedeem => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/reject/${
        dataRedeem.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };

      const requestdata = {
        comment: dataRedeem.comment
      };

      return axios
        .post(REDEEM_API_ENDPOINT, requestdata, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getRedeemByIdService = redeemId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/applyfor/get/${redeemId}`;

      const dataRedeem = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(REDEEM_API_ENDPOINT, dataRedeem)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
