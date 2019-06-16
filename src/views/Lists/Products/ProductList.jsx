import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
// import InfoOutline from "@material-ui/icons/InfoOutline";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import * as productActions from "../../../actions/productActions";

import priceImage1 from "assets/img/llantascontinental/powercontact_2 (1).png";
import priceImage2 from "assets/img/llantascontinental/premiumcontact_2 (2).png";
import priceImage3 from "assets/img/llantascontinental/sportcontact_6-1.png";

// utils

import { SERVER_URL } from "../../../constants/server";

class productList extends React.Component {
  componentDidMount() {
    this.props.ProductActions.getProductsAction();
  }

  buildGridData(classes) {
    const { products } = this.props;
    let gridData = [];
    if (products.length > 0) {
      gridData = products.map((picture, index) => {
        // const path = SERVER_URL + picture.path;
        const imgElement = (
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={picture.image.medium} alt={picture.name} />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Power Contact 2
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>Descripción</p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$899</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Bogotá, Colombia
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        );
        return [imgElement];
      });

      return gridData;
    }
  }

  render() {
    const { classes } = this.props;

    const gridData = this.buildGridData(classes);

    return this.props.products.length > 0 ? (
      <div>
        <h3>Lista de Productos</h3>
        <br />
        <GridContainer>{gridData}</GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardBody style={{ textAlign: "center" }}>
                <Pagination
                  pages={[
                    { text: "PREV" },
                    { text: 1 },
                    { text: 2 },
                    {
                      active: true,
                      text: 3
                    },
                    { text: 4 },
                    { text: 5 },
                    { text: "NEXT" }
                  ]}
                  color="warning"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ProductActions: bindActionCreators(productActions, dispatch)
  };
}

export default compose(
  withStyles(dashboardStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(productList);

// export default withStyles(dashboardStyle)(productList);
