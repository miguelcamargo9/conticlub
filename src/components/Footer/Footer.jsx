import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";
import logo1 from "assets/img/logo.png";
import logo2 from "assets/img/logo2.png";

function Footer({ ...props }) {
  const { classes, fluid, white, black } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.blackColor]: black
  });
  var block = cx({
    [classes.center]: true,
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <GridContainer className={container} justify="space-between">
        <GridItem xs={12} sm={4} className={block}>
          <img src={logo1} height="90%" width="90%" alt="Slide" />
        </GridItem>
        <GridItem xs={12} sm={4} className={block}>
          <img src={logo2} height="90%" width="90%" alt="Slide" />
        </GridItem>
      </GridContainer>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
