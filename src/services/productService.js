import axios from "axios";

// import * as serviceConst from "./index";
// import { SERVER_URL } from "../constants/server";

export const productService = () => {
  // const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/slides/all`;
  const LOGIN_API_ENDPOINT = "https://api.tvmaze.com/shows";

  // const data = {
  //   headers: {
  //     Authorization: serviceConst.AUTH
  //   }
  // };

  return (
    axios
      // .get(LOGIN_API_ENDPOINT, data)
      .get(LOGIN_API_ENDPOINT)
      .then(response => {
        let output = response.data.slice(0, 16);
        console.log(output);
        return output;
      })
      .catch(function(error) {
        console.log(error);
      })
  );
};
