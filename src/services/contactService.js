import axios from "axios";
import { sessionService } from "redux-react-session";

import { SERVER_URL } from "../constants/server";

export const sendMailService = mailData => {
  return sessionService
    .loadSession()
    .then(currentSession => {
      const SEND_MAIL_API_ENDPOINT = `${SERVER_URL}/api/users/contactenos`;

      const headers = {
        Authorization: `Bearer ${currentSession.access_token}`
      };
      const dataMail = {
        asunto: mailData.subject,
        mensaje: mailData.description
      };

      return axios
        .post(SEND_MAIL_API_ENDPOINT, dataMail, { headers: headers })
        .then(response => {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(err => console.log(err));
};
