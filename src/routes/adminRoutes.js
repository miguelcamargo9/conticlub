//Users
import RegisterUserForm from "../views/Forms/Users/RegisterUserForm.jsx";
import UserList from "../views/Lists/Users/UserList";
import EditUser from "../views/Forms/Users/EditUser";

//Slides
import ListSlides from "../views/Admin/Slides/ListSlides";
import CreateSlide from "../views/Admin/Slides/CreateSlide";

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

//Subsidiaries
import CreateSubsidiary from "../views/Admin/Subsidiaries/CreateSubsidiary.jsx";
import ListSubsidiaries from "../views/Admin/Subsidiaries/ListSubsidiaries.jsx";
import EditSubsidiary from "../views/Admin/Subsidiaries/EditSubsidiary.jsx";

//Invoices
import InvoicesListAll from "../views/Lists/Invoices/InvoicesListAll.jsx";
import InvoiceDetails from "../views/Lists/Invoices/InvoiceDetails";

//Report
import PointsReport from "../views/Admin/Reports/PointsReport";

// @material-ui/icons
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import ListALt from "@material-ui/icons/ListAlt";
import CardTravel from "@material-ui/icons/CardTravel";
import Store from "@material-ui/icons/Store";
import Category from "@material-ui/icons/CategorySharp";
import Slideshow from "@material-ui/icons/Slideshow";
import LocalMall from "@material-ui/icons/LocalMall";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const adminRoutes = [
  ...generalRoutes,
  {
    collapse: true,
    name: "Slides",
    rtlName: "Admin",
    icon: Slideshow,
    views: [
      {
        path: "/list-slides",
        name: "Slides",
        rtlName: "Admin Slides",
        mini: "SL",
        rtlMini: "SL",
        layout: "/admin",
        component: ListSlides
      },
      {
        path: "/create-slide",
        name: "Agregar Slide",
        rtlName: "Add Slide",
        mini: "AS",
        rtlMini: "AS",
        layout: "/admin",
        component: CreateSlide
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
      },
      {
        path: "/edit-users/:id",
        name: "Editar Usuario",
        rtlName: "Edit User",
        mini: "EU",
        rtlMini: "EU",
        component: EditUser,
        layout: "/admin",
        invisible: true
      }
    ]
  },
  {
    collapse: true,
    name: "Sucursales",
    rtlName: "Sucursales",
    icon: LocalMall,
    state: "pageSubsidiariesCollapse",
    views: [
      {
        path: "/create-subsidiary",
        name: "Crear Sucursal",
        rtlName: "Create Subsidiary",
        mini: "CS",
        rtlMini: "CS",
        component: CreateSubsidiary,
        layout: "/admin"
      },
      {
        path: "/edit-subsidiary/:id",
        name: "Editar Subsidiaria",
        rtlName: "Edit Sucursal",
        mini: "EC",
        rtlMini: "EC",
        component: EditSubsidiary,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/list-subsidiaries",
        name: "Lista Sucursales",
        rtlName: "Subsidiaries List",
        mini: "LS",
        rtlMini: "LS",
        component: ListSubsidiaries,
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
      },
      {
        path: "/invoice-details/:id",
        name: "Detalle de Factura",
        rtlName: "Invoices Details",
        mini: "ID",
        rtlMini: "ID",
        component: InvoiceDetails,
        layout: "/admin",
        invisible: true
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
    collapse: true,
    name: "Reportes",
    rtlName: "Reports",
    icon: ListALt,
    state: "pageReportsCollapse",
    views: [
      {
        path: "/points",
        name: "Reporte de puntos",
        rtlName: "Points Report",
        mini: "RP",
        rtlMini: "RP",
        layout: "/admin",
        component: PointsReport
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
