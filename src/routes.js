import ContactForm from "views/Forms/ContactForm.jsx";
import CreateUserForm from "views/Forms/Users/CreateUserForm.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import HowToWorks from "views/Pages/HowToWorks.jsx";
import Politics from "views/Pages/Politics.jsx";
import ProductList from "views/Lists/Products/ProductList.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import Wizard from "views/Forms/Wizard.jsx";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import Users from "@material-ui/icons/People";
import Gift from "@material-ui/icons/CardGiftcard";
import TouchApp from "@material-ui/icons/TouchApp";
import Email from "@material-ui/icons/Email";
import Gavel from "@material-ui/icons/Gavel";
import CardTravel from "@material-ui/icons/CardTravel";

var dashRoutes = [
  {
    path: "/home",
    name: "Inicio",
    rtlName: "Home",
    icon: HomeIcon,
    component: Dashboard,
    layout: "/home"
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
        component: Wizard,
        layout: "/admin"
      },
      {
        path: "/list-users",
        name: "Lista Usuarios",
        rtlName: "User List",
        mini: "LU",
        rtlMini: "UL",
        component: ReactTables,
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
        path: "/register-sale",
        name: "Ingresar Venta",
        rtlName: "Register Sale",
        mini: "IV",
        rtlMini: "RS",
        component: CreateUserForm,
        layout: "/admin"
      },
      {
        path: "/approve-change",
        name: "Aprobar Premio",
        rtlName: "Approve Change",
        mini: "AP",
        rtlMini: "AC",
        component: CreateUserForm,
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
  }
];
export default dashRoutes;
