import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const approveRedeemService = redeemId => {
  const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/approve/${redeemId}`;

  const dataRedeem = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .post(REDEEM_API_ENDPOINT, dataRedeem)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
export const rejectRedeemService = redeemId => {
  const REDEEM_API_ENDPOINT = `${SERVER_URL}/api/product/reject/${redeemId}`;

  const dataRedeem = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .post(REDEEM_API_ENDPOINT, dataRedeem)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
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
