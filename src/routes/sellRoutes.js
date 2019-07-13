import RedeemList from "../views/Lists/Invoices/RedeemList";
import ConfirmRedeemForm from "../views/Forms/Sales/ConfirmRedeemForm";
import InvoiceDetails from "../views/Lists/Invoices/InvoiceDetails";

// @material-ui/icons
import CardTravel from "@material-ui/icons/CardTravel";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const sellRoutes = [
  ...generalRoutes,
  {
    path: "/redeem-list",
    name: "Lista Redenciones",
    rtlName: "Redeem List",
    icon: CardTravel,
    component: RedeemList,
    layout: "/admin"
  },
  {
    path: "/confirm-redeem/:id",
    name: "Confirmar Redencion",
    rtlName: "Redeem Confirm",
    icon: CardTravel,
    component: ConfirmRedeemForm,
    layout: "/admin",
    invisible: true
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
  },
  ...generaFinallRoutes
];
