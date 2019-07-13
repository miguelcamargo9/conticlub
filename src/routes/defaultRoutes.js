import ContactForm from "../views/Forms/ContactForm.jsx";
// import HowToWorks from "../views/Pages/HowToWorks.jsx";
import Politics from "../views/Pages/Politics.jsx";
import ProductList from "../views/Lists/Products/ProductList.jsx";
import InvoicesList from "../views/Lists/Invoices/InvoicesList.jsx";
import InvoiceDetails from "../views/Lists/Invoices/InvoiceDetails";
import RegisterUserForm from "../views/Forms/Users/RegisterUserForm.jsx";
import RegisterInvoiceForm from "../views/Forms/Sales/RegisterInvoiceForm.jsx";
import RedeemProducts from "../views/Forms/Products/RedeemProducts";
import RedeemUserList from "../views/Lists/Invoices/RedeemUserList";

// @material-ui/icons
import Gift from "@material-ui/icons/CardGiftcard";
// import TouchApp from "@material-ui/icons/TouchApp";
import Email from "@material-ui/icons/Email";
import Gavel from "@material-ui/icons/Gavel";
import CardTravel from "@material-ui/icons/CardTravel";
import List from "@material-ui/icons/List";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const defaultRoutes = [
  ...generalRoutes,
  {
    collapse: true,
    name: "Ventas",
    rtlName: "Sales",
    icon: CardTravel,
    state: "pageSaleCollapse",
    views: [
      {
        path: "/register-sale",
        name: "Ingresar Venta",
        rtlName: "Register Sale",
        mini: "IV",
        rtlMini: "RS",
        component: RegisterInvoiceForm,
        layout: "/admin"
      },
      {
        path: "/invoices-list",
        name: "Lista de Ventas",
        rtlName: "Invoices List",
        mini: "LV",
        rtlMini: "IL",
        component: InvoicesList,
        layout: "/admin"
      },
      {
        path: "/invoice-details/:id",
        name: "Detalle de Factrua",
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
    path: "/products",
    name: "Catálogo de Productos",
    rtlName: "Products",
    icon: Gift,
    component: ProductList,
    layout: "/admin"
  },
  {
    path: "/redeem-list",
    name: "Lista Redenciones",
    rtlName: "Redeem List",
    icon: List,
    component: RedeemUserList,
    layout: "/admin"
  },
  // {
  //   path: "/howtoworks",
  //   name: "Cómo Funciona",
  //   rtlName: "How To Works",
  //   icon: TouchApp,
  //   component: HowToWorks,
  //   layout: "/admin"
  // },
  {
    path: "/contact",
    name: "Contáctanos",
    rtlName: "Contact us",
    icon: Email,
    component: ContactForm,
    layout: "/admin"
  },
  {
    path: "/politics",
    name: "Políticas Y Condiciones",
    rtlName: "Politics",
    icon: Gavel,
    component: Politics,
    layout: "/admin"
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
  {
    path: "/redeem-product/:id",
    name: "Redimir Porducto",
    rtlName: "Redeem Product",
    mini: "RP",
    rtlMini: "RP",
    component: RedeemProducts,
    layout: "/admin",
    invisible: true
  },
  ...generaFinallRoutes
];
