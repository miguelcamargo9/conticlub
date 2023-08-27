import axios from "axios";
import { sessionService } from "redux-react-session";
import { SERVER_URL } from "../constants/server";

export const getCities = async () => {
  try {
    const currentSession = await sessionService.loadSession();
    const API_ENDPOINT = `${SERVER_URL}/api/cities/all`;

    const data = {
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`
      }
    };

    try {
      const response = await axios.get(API_ENDPOINT, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};
