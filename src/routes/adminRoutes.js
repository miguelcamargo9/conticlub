import AdminSlide from "../views/Admin/Slides/AdminSlide.jsx";
import RegisterUserForm from "../views/Forms/Users/RegisterUserForm.jsx";
import UserList from "../views/Lists/Users/UserList";

//Profiles
import CreateProfile from "../views/Admin/Profiles/CreateProfile";
import EditProfile from "../views/Admin/Profiles/EditProfile";
import ProfilesList from "../views/Admin/Profiles/ProfilesList";

// @material-ui/icons
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const adminRoutes = [
  ...generalRoutes,
  {
    collapse: true,
    name: "Administración",
    rtlName: "Admin",
    icon: Lock,
    views: [
      {
        path: "/admin-slides",
        name: "Slides",
        rtlName: "Admin Slides",
        mini: "SL",
        rtlMini: "SL",
        layout: "/admin",
        component: AdminSlide
      }
    ]
  },
  {
    collapse: true,
    name: "Usuarios",
    rtlName: "Users",
    icon: Person,
    state: "pageCollapse",
    views: [
      {
        path: "/create-user",
        name: "Crear Usuario",
        rtlName: "Create User",
        mini: "CU",
        rtlMini: "CU",
        component: RegisterUserForm,
        layout: "/admin"
      },
      {
        path: "/list-users",
        name: "Lista Usuarios",
        rtlName: "User List",
        mini: "LU",
        rtlMini: "UL",
        component: UserList,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Perfiles",
    rtlName: "Profiles",
    icon: People,
    state: "pageProfileCollapse",
    views: [
      {
        path: "/create-profile",
        name: "Crear Perfil",
        rtlName: "Create Profile",
        mini: "CP",
        rtlMini: "CP",
        component: CreateProfile,
        layout: "/admin"
      },
      {
        path: "/edit-profile/:id",
        name: "Editar Perfil",
        rtlName: "Edit Profile",
        mini: "EP",
        rtlMini: "EP",
        component: EditProfile,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/profiles-list",
        name: "Lista Perfiles",
        rtlName: "Profiles List",
        mini: "LP",
        rtlMini: "PL",
        component: ProfilesList,
        layout: "/admin"
      }
    ]
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
  },
  ...generaFinallRoutes
];
