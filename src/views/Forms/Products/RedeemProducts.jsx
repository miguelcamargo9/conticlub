import React from "react";

import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";

import { SERVER_URL } from "../../../constants/server";

import {
  getProductByIdService,
  redeemProductService
} from "../../../services/productService";

import * as sessionActions from "../../../actions/sessionActions";

class RedeemProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageError: false,
      successMessage: false,
      product: {
        name: "",
        product_category: {
          name: ""
        },
        points: "",
        image: ""
      }
    };
    this.handleRedeemProduct = this.handleRedeemProduct.bind(this);
  }

  componentDidMount() {
    getProductByIdService(this.props.match.params.id).then(product => {
      this.setState({ product: product.data });
    });
  }

  handleRedeemProduct(product) {
    redeemProductService(product.id).then(responseRedeemProfile => {
      if (responseRedeemProfile.data.message === "success") {
        this.props.SessionActions.setPoints(
          responseRedeemProfile.data.currentPoints
        );
        this.setState({
          messageError: null,
          successMessage: `Producto ${product.name} Redimido con Éxito`
        });
        setTimeout(() => {
          this.props.history.push(`/admin/redeem-list`);
        }, 3000);
      } else {
        this.setState({
          messageError: responseRedeemProfile.data.detail,
          successMessage: null
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { product } = this.state;

    const { messageError, successMessage } = this.state;

    const errorDiv = messageError ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={messageError} color="danger" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    const successDiv = successMessage ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={successMessage} color="success" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    return (
      <div>
        {errorDiv}
        {successDiv}
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <StoreMallDirectory />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Redimir Porducto</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Nombre de Porducto"
                      id="product-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          console.log("cambie");
                        },
                        value: product.name,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Categoría"
                      id="catgory-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: product.product_category.name,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Puntos"
                      id="points-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: product.points,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <img
                      src={SERVER_URL + product.image}
                      alt={product.name}
                      width="70%"
                    />
                  </GridItem>
                </GridContainer>
                <Button
                  color="success"
                  className={classes.updateProfileButton}
                  onClick={() => {
                    this.handleRedeemProduct(product);
                  }}
                >
                  Redimir
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SessionActions: bindActionCreators(sessionActions, dispatch)
  };
}

export default compose(
  withStyles(userProfileStyles),
  connect(
    null,
    mapDispatchToProps
  )
)(RedeemProduct);
