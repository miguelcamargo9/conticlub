import axios from "axios";
import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const getInvoiceByUserService = () => {
  const API_ENDPOINT = `${SERVER_URL}/api/reportes/invoicebyuser`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    }
  };

  return axios
    .get(API_ENDPOINT, data)
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
};
