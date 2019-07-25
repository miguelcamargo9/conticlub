import axios from "axios";
import { sessionService } from "redux-react-session";

import { SERVER_URL } from "../constants/server";

export const insertInvoice = invoiceData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const INVOICE_API_ENDPOINT = `${SERVER_URL}/api/invoice/create`;

      let formData = new FormData();

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const data = {
        sale_date: invoiceData.date,
        number: invoiceData.invoiceNumber,
        price: invoiceData.totalAmount,
        subsidiary_id: invoiceData.subsidiaryId
      };
      const rines = invoiceData.rines;

      formData.append("data", JSON.stringify(data)); //append the values with key, value pair
      formData.append("rines", JSON.stringify(rines));
      formData.append("image", invoiceData.image, invoiceData.image.name);

      return axios
        .post(INVOICE_API_ENDPOINT, formData, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getInvoiceHistoryService = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const INVOICE_API_ENDPOINT = `${SERVER_URL}/api/invoice/all`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(INVOICE_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const getInvoiceDetailsService = invoiceId => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const INVOICE_API_ENDPOINT = `${SERVER_URL}/api/invoice/get/${invoiceId}`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
        }
      };

      return axios
        .get(INVOICE_API_ENDPOINT, data)
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};

export const rejectInvoiceService = dataInvoice => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const INVOICE_API_ENDPOINT = `${SERVER_URL}/api/invoice/rejected/${
        dataInvoice.id
      }`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };

      const requestdata = {
        comment_rejected: dataInvoice.comment
      };

      return axios
        .post(INVOICE_API_ENDPOINT, requestdata, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
