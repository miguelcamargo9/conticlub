import Home from "../views/Home/Home.jsx";
import LoginPage from "../views/Pages/LoginPage.jsx";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";

export const generalRoutes = [
  {
    path: "/home",
    name: "Inicio",
    rtlName: "Home",
    icon: HomeIcon,
    component: Home,
    layout: "/admin"
  },
  {
    path: "/login-page",
    name: "Iniciar Sesión",
    rtlName: "Login Page",
    mini: "L",
    rtlMini: "LP",
    component: LoginPage,
    layout: "/auth",
    invisible: true
  }
];
