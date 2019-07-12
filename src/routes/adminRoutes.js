// import AdminSlide from "../views/Admin/Slides/AdminSlide.jsx";
import RegisterUserForm from "../views/Forms/Users/RegisterUserForm.jsx";
import UserList from "../views/Lists/Users/UserList";

//Profiles
import CreateProfile from "../views/Admin/Profiles/CreateProfile";
import EditProfile from "../views/Admin/Profiles/EditProfile";
import ProfilesList from "../views/Admin/Profiles/ProfilesList";

//Products
import ProductListAdmin from "../views/Admin/Products/ProductListAdmin";
import CreateProduct from "../views/Admin/Products/CreateProduct";
import EditProduct from "../views/Admin/Products/EditProduct";

//Product Categories
import CreateCategory from "../views/Admin/Categories/CreateCategory.jsx";
import ListCategories from "../views/Admin/Categories/ListCategories.jsx";
import EditCategory from "../views/Admin/Categories/EditCategory.jsx";

//Invoices
import InvoicesListAll from "../views/Lists/Invoices/InvoicesListAll.jsx";

// @material-ui/icons
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
// import Lock from "@material-ui/icons/Lock";
import CardTravel from "@material-ui/icons/CardTravel";
import Store from "@material-ui/icons/Store";
import Category from "@material-ui/icons/CategorySharp";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const adminRoutes = [
  ...generalRoutes,
  // {
  //   collapse: true,
  //   name: "Administración",
  //   rtlName: "Admin",
  //   icon: Lock,
  //   views: [
  //     {
  //       path: "/admin-slides",
  //       name: "Slides",
  //       rtlName: "Admin Slides",
  //       mini: "SL",
  //       rtlMini: "SL",
  //       layout: "/admin",
  //       component: AdminSlide
  //     }
  //   ]
  // },
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
    collapse: true,
    name: "Ventas",
    rtlName: "Sales",
    icon: CardTravel,
    state: "pageSaleCollapse",
    views: [
      {
        path: "/invoices-list",
        name: "Lista de Ventas",
        rtlName: "Invoices List",
        mini: "LV",
        rtlMini: "IL",
        component: InvoicesListAll,
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
        mini: "CPC",
        rtlMini: "CPC",
        component: CreateCategory,
        layout: "/admin"
      },
      {
        path: "/edit-category/:id",
        name: "Editar Categoría",
        rtlName: "Edit Category",
        mini: "EC",
        rtlMini: "EC",
        component: EditCategory,
        layout: "/admin",
        invisible: true
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
    collapse: true,
    name: "Productos",
    rtlName: "Products",
    icon: Store,
    state: "pageProductsCollapse",
    views: [
      {
        path: "/create-product",
        name: "Crear Producto",
        rtlName: "Create Product",
        mini: "CP",
        rtlMini: "CP",
        component: CreateProduct,
        layout: "/admin"
      },
      {
        path: "/edit-product/:id",
        name: "Editar Producto",
        rtlName: "Edit Product",
        mini: "EP",
        rtlMini: "EP",
        component: EditProduct,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/list-products",
        name: "Lista Productos",
        rtlName: "List Products",
        mini: "LP",
        rtlMini: "LP",
        component: ProductListAdmin,
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
