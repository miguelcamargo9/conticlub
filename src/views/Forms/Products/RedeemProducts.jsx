import React from "react";

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

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";

class RedeemProduct extends React.Component {
  constructor(props) {
    super(props);
    this.redeemProduct = this.redeemProduct.bind(this);
  }

  redeemProduct(product) {
    redeemProductService(product.id).then(responseRedeemProfile => {
      if (responseRedeemProfile.data.message === "success") {
        this.setState({
          messageError: null,
          successMessage: `Procuto ${product.name} Redimido con Éxito`
        });
        setTimeout(() => {
          this.props.history.push(`/admin/product-list`);
        }, 3000);
      } else {
        this.setState({
          messageError: responseSaveProfile.data.message,
          successMessage: null
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { product } = this.props.location.state;

    return (
      <div>
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
                        defaultValue: product.name,
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
                        defaultValue: product.categoryName,
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
                        defaultValue: product.points,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <img src={product.path} alt={product.name} width="70%" />
                  </GridItem>
                </GridContainer>
                <Button
                  color="success"
                  className={classes.updateProfileButton}
                  onClick={this.redeemProduct(product)}
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

export default withStyles(userProfileStyles)(RedeemProduct);
