// import routes
import LoginPage from "./views/Pages/LoginPage.jsx";

import { sessionService } from "redux-react-session";

import { adminRoutes, defaultRoutes, sellRoutes } from "./routes/";
import RegisterUserForm from "./views/Forms/Users/RegisterUserForm.jsx";

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
          case 4:
            dashRoutes = [...sellRoutes];
            break;
          default:
            dashRoutes = [...defaultRoutes];
            break;
        }
      } else {
        dashRoutes = [
          {
            path: "/login-page",
            name: "Iniciar Sesión",
            rtlName: "Login Page",
            mini: "L",
            rtlMini: "LP",
            component: LoginPage,
            layout: "/auth",
            invisible: true
          },
          {
            path: "/register-page",
            name: "Registrar Usuario",
            rtlName: "User Register",
            mini: "RU",
            rtlMini: "UR",
            component: RegisterUserForm,
            layout: "/auth",
            invisible: true
          }
        ];
      }
      return dashRoutes;
    })
    .catch(err => console.log(err));
};
