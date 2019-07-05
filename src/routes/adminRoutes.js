import AdminSlide from "../views/Admin/Slides/AdminSlide.jsx";
import RegisterUserForm from "../views/Forms/Users/RegisterUserForm.jsx";
import UserList from "../views/Lists/Users/UserList";

//Product Categories
import CreateCategory from "../views/Admin/Categories/CreateCategory.jsx";
import ListCategories from "../views/Admin/Categories/ListCategories.jsx";

// @material-ui/icons
import Users from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";

import Category from "@material-ui/icons/CategorySharp";

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
    icon: Users,
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
    name: "Categorias",
    rtlName: "Categories",
    icon: Category,
    state: "pageCategoriesCollapse",
    views: [
      {
        path: "/create-category",
        name: "Crear Categoria",
        rtlName: "Create Category",
        mini: "CP",
        rtlMini: "CP",
        component: CreateCategory,
        layout: "/admin"
      },
      {
        path: "/list-categories",
        name: "Lista Categorias",
        rtlName: "Category List",
        mini: "LC",
        rtlMini: "LC",
        component: ListCategories,
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
