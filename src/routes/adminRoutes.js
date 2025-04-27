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

//Cities
import CreateCity from "../views/Admin/Cities/CreateCity.jsx";
import ListCities from "../views/Admin/Cities/ListCities.jsx";
import EditCity from "../views/Admin/Cities/EditCity.jsx";

//Subsidiaries
import CreateSubsidiary from "../views/Admin/Subsidiaries/CreateSubsidiary.jsx";
import ListSubsidiaries from "../views/Admin/Subsidiaries/ListSubsidiaries.jsx";
import EditSubsidiary from "../views/Admin/Subsidiaries/EditSubsidiary.jsx";

//Brands
import CreateBrand from "../views/Admin/Brands/CreateBrand.jsx";
import ListBrands from "../views/Admin/Brands/ListBrands.jsx";
import EditBrand from "../views/Admin/Brands/EditBrand.jsx";

//Designs
import CreateDesign from "../views/Admin/Designs/CreateDesign.jsx";
import ListDesigns from "../views/Admin/Designs/ListDesigns.jsx";
import EditDesign from "../views/Admin/Designs/EditDesign.jsx";

//Tires
import CreateTire from "../views/Admin/Tires/CreateTire.jsx";
import ListTires from "../views/Admin/Tires/ListTires.jsx";
import EditTire from "../views/Admin/Tires/EditTire.jsx";

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
import Brush from "@material-ui/icons/Brush";
import DriveEta from "@material-ui/icons/DriveEta";
import LocationCity from "@material-ui/icons/LocationCity";
import LocalOffer from "@material-ui/icons/LocalOffer";

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
    name: "Ciuades",
    rtlName: "Cities",
    icon: LocationCity,
    state: "pageCitiesCollapse",
    views: [
      {
        path: "/create-city",
        name: "Crear Ciudad",
        rtlName: "Create City",
        mini: "CC",
        rtlMini: "CC",
        component: CreateCity,
        layout: "/admin"
      },
      {
        path: "/edit-city/:id",
        name: "Editar Ciudad",
        rtlName: "Edit City",
        mini: "EC",
        rtlMini: "EC",
        component: EditCity,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/list-cities",
        name: "Lista Ciudades",
        rtlName: "Cities List",
        mini: "LC",
        rtlMini: "CL",
        component: ListCities,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Sucursales",
    rtlName: "Subsidiares",
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
        mini: "ES",
        rtlMini: "ES",
        component: EditSubsidiary,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/list-subsidiaries",
        name: "Lista Sucursales",
        rtlName: "Subsidiaries List",
        mini: "LS",
        rtlMini: "SL",
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
    name: "Marcas",
    rtlName: "Brands",
    icon: LocalOffer,
    state: "pageBrandsCollapse",
    views: [
      {
        path: "/create-brand",
        name: "Crear Marca",
        rtlName: "Create Brand",
        mini: "CM",
        rtlMini: "CB",
        component: CreateBrand,
        layout: "/admin"
      },
      {
        path: "/edit-brand/:id",
        name: "Editar Marca",
        rtlName: "Edit Brand",
        mini: "EM",
        rtlMini: "EB",
        component: EditBrand,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/list-brands",
        name: "Lista Marcas",
        rtlName: "Brands List",
        mini: "LM",
        rtlMini: "BL",
        component: ListBrands,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Diseños",
    rtlName: "Designs",
    icon: Brush,
    state: "pageDesignsCollapse",
    views: [
      {
        path: "/create-design",
        name: "Crear Diseño",
        rtlName: "Create Design",
        mini: "CD",
        rtlMini: "CD",
        component: CreateDesign,
        layout: "/admin"
      },
      {
        path: "/edit-design/:id",
        name: "Editar Diseño",
        rtlName: "Edit Design",
        mini: "ED",
        rtlMini: "ED",
        component: EditDesign,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/list-designs",
        name: "Lista Diseños",
        rtlName: "Designs List",
        mini: "LD",
        rtlMini: "LD",
        component: ListDesigns,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Llantas",
    rtlName: "Tires",
    icon: DriveEta,
    state: "pageTiresCollapse",
    views: [
      {
        path: "/create-tire",
        name: "Crear Llanta",
        rtlName: "Create Tire",
        mini: "CL",
        rtlMini: "CT",
        component: CreateTire,
        layout: "/admin"
      },
      {
        path: "/edit-tire/:id",
        name: "Editar Llanta",
        rtlName: "Edit Tire",
        mini: "EL",
        rtlMini: "ED",
        component: EditTire,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/list-tires",
        name: "Lista Llantas",
        rtlName: "Tires List",
        mini: "LL",
        rtlMini: "TD",
        component: ListTires,
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
