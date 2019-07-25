import { sessionService } from "redux-react-session";

import {
  adminRoutes,
  defaultRoutes,
  sellRoutes,
  generalRoutes
} from "./routes/";

export const getAllRoutes = () => {
  return sessionService
    .loadUser()
    .then(user => {
      const profile = Number.parseInt(user.profiles_id, 10);

      let dashRoutes = [];

      if (profile) {
        switch (profile) {
          case 1:
            dashRoutes = [...adminRoutes];
            break;
          case (4, 5):
            dashRoutes = [...sellRoutes];
            break;
          default:
            dashRoutes = [...defaultRoutes];
            break;
        }
      } else {
        dashRoutes = [...generalRoutes];
      }
      return dashRoutes;
    })
    .catch(err => {
      console.log(err);
      const dashRoutes = [...generalRoutes];
      return dashRoutes;
    });
};
