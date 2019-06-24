import ContactForm from "../views/Forms/ContactForm.jsx";
import HowToWorks from "../views/Pages/HowToWorks.jsx";
import Politics from "../views/Pages/Politics.jsx";
import ProductList from "../views/Lists/Products/ProductList.jsx";
import RegisterUserForm from "../views/Forms/Users/RegisterUserForm.jsx";
import RegisterInvoiceForm from "../views/Forms/Sales/RegisterInvoiceForm.jsx";

// @material-ui/icons
import Gift from "@material-ui/icons/CardGiftcard";
import TouchApp from "@material-ui/icons/TouchApp";
import Email from "@material-ui/icons/Email";
import Gavel from "@material-ui/icons/Gavel";
import CardTravel from "@material-ui/icons/CardTravel";

import { generalRoutes } from "./generalRoutes";

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
    path: "/howtoworks",
    name: "Cómo Funciona",
    rtlName: "How To Works",
    icon: TouchApp,
    component: HowToWorks,
    layout: "/admin"
  },
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
  }
];
