import Buttons from "views/Components/Buttons.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Charts from "views/Charts/Charts.jsx";
import ContactForm from "views/Forms/ContactForm.jsx";
import CreateUserForm from "views/Forms/Users/CreateUserForm.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import ErrorPage from "views/Pages/ErrorPage.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import HowToWorks from "views/Pages/HowToWorks.jsx";
import Icons from "views/Components/Icons.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Panels from "views/Components/Panels.jsx";
import Politics from "views/Pages/Politics.jsx";
import PricingPage from "views/Pages/PricingPage.jsx";
import ProductList from "views/Lists/Products/ProductList.jsx";
import RTLSupport from "views/Pages/RTLSupport.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import SweetAlert from "views/Components/SweetAlert.jsx";
import TimelinePage from "views/Pages/Timeline.jsx";
import Typography from "views/Components/Typography.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Widgets from "views/Widgets/Widgets.jsx";
import Wizard from "views/Forms/Wizard.jsx";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Users from "@material-ui/icons/People";
import Gift from "@material-ui/icons/CardGiftcard";
import TouchApp from "@material-ui/icons/TouchApp";
import Email from "@material-ui/icons/Email";
import Gavel from "@material-ui/icons/Gavel";
import CardTravel from "@material-ui/icons/CardTravel";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

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
