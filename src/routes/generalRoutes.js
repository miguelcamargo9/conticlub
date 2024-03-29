import Home from "../views/Home/Home.jsx";
import LoginPage from "../views/Pages/LoginPage.jsx";
import RecoverPasswordPage from "../views/Pages/RecoverPasswordPage.jsx";
import LogoutPage from "../views/Pages/LogoutPage.jsx";
// import UserProfile from "../views/Home/UserProfile";
import EditUser from "../views/Home/EditUser";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";

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
  },
  {
    path: "/recovery-pass",
    name: "Recuperar Contraseña",
    rtlName: "Recovery Password",
    mini: "RC",
    rtlMini: "RP",
    component: RecoverPasswordPage,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/profile-user",
    name: "Mi Perfil",
    rtlName: "User Profile",
    mini: "MP",
    rtlMini: "MP",
    component: EditUser,
    layout: "/admin",
    invisible: true
  }
];

export const generaFinallRoutes = [
  {
    path: "/logout-page",
    name: "Cerrar Sesión",
    rtlName: "Logout Page",
    icon: ExitToApp,
    component: LogoutPage,
    layout: "/auth"
  }
];
