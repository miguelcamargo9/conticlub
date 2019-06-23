// import routes
import { adminRoutes, defaultRoutes, sellRoutes } from "./routes/";

const profile = Number.parseInt(localStorage.getItem("profile"), 10);

let dashRoutes = [];

if (profile) {
  switch (profile) {
    case 1:
      dashRoutes = [...adminRoutes];
      break;
    case 4:
      dashRoutes = [...sellRoutes];
      break;
    default:
      dashRoutes = [...defaultRoutes];
      break;
  }
}

export default dashRoutes;
