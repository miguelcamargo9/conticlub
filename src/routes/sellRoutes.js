import RegisterInvoiceForm from "../views/Forms/Sales/RegisterInvoiceForm.jsx";

// @material-ui/icons
import CardTravel from "@material-ui/icons/CardTravel";

import { generalRoutes } from "./generalRoutes";

export const sellRoutes = [
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
  }
];
