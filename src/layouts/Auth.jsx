import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";

import { defaultRoutes } from "../routes/";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";

import error from "assets/img/clint-mckoy.jpg";
import bdimg from "assets/img/sidebar-2.jpg";

class Pages extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBgImage = () => {
    if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
      return bdimg;
    } else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
      return bdimg;
    } else if (window.location.pathname.indexOf("/auth/error-page") !== -1) {
      return error;
    }
  };
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <AuthNavbar brandText={this.getActiveRoute(defaultRoutes)} {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}
          >
            <Switch>{this.getRoutes(defaultRoutes)}</Switch>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
