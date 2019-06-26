import axios from "axios";

import * as serviceConst from "./index";
import { SERVER_URL } from "../constants/server";

export const insertInvoice = invoiceData => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/invoice/create`;

  let formData = new FormData();

  const headers = {
    Authorization: serviceConst.AUTH,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const data = {
    sale_date: invoiceData.date,
    number: invoiceData.invoiceNumber,
    price: invoiceData.totalAmount,
    users_id: invoiceData.userId
  };
  const rines = invoiceData.rines;

  formData.append("data", JSON.stringify(data)); //append the values with key, value pair
  formData.append("rines", JSON.stringify(rines));
  formData.append("image", invoiceData.image, invoiceData.image.name);

  return axios
    .post(LOGIN_API_ENDPOINT, formData, { headers: headers })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
