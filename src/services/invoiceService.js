import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const insertInvoice = invoiceData => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/invoice/create`;

  const data = {
    headers: {
      Authorization: serviceConst.AUTH
    },
    data: {
      sale_date: "2019-06-17",
      number: invoiceData.invoiceNumber,
      price: invoiceData.totalAmount,
      users_id: 1
    },
    rines: invoiceData.rines
  };

  return axios
    .post(LOGIN_API_ENDPOINT, data)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
