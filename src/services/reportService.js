import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getInvoiceByUserService = () => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const API_ENDPOINT = `${SERVER_URL}/api/reports/invoiceByUser`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`
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
    })
    .catch(err => console.log(err));
};
