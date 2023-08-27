import React from "react";
import Select from "react-select";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

import { createDesignService } from "../../../services/designService";
import { getBrands } from "../../../services/brandService";

class CreateDesign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designName: "",
      designNameState: "",
      brand: "",
      brandState: "",
      brands: []
    };
    this.isValidated = this.isValidated.bind(this);
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataDesign = {
        name: this.state.designName,
        brand_id: this.state.brand.id
      };
      createDesignService(dataDesign).then(responseSaveDesign => {
        if (responseSaveDesign.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Diseño Creada con Éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-designs`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveDesign.data.message,
            successMessage: null
          });
        }
      });
    }
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  handleChangeBrand = brand => {
    this.setState({ brand: brand, brandState: "success" });
  };

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }

    this.setState({ [stateName]: event.target.value });
  }

  componentDidMount() {
    this.loadBrands();
  }

  async loadBrands() {
    try {
      const brandInfo = await getBrands();
      const brandSelectData = brandInfo.data.map(brand => {
        brand.value = brand.id;
        brand.label = brand.name;
        return brand;
      });
      this.setState({ brands: brandSelectData });
    } catch (error) {
      console.log(error);
    }
  }

  isValidated() {
    if (
      this.state.designNameState === "success" &&
      this.state.brandState === "success"
    ) {
      return true;
    } else {
      if (this.state.designNameState !== "success") {
        this.setState({ designNameState: "error" });
      }
      if (this.state.brandState !== "success") {
        this.setState({ brandState: "error" });
      }
    }
    return false;
  }

  render() {
    const { classes } = this.props;

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
      <GridContainer>
        {errorDiv}
        {successDiv}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" text>
              <CardText color="warning">
                <h4 className={classes.cardTitle}>Crear Diseño</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.designNameState === "success"}
                      error={this.state.designNameState === "error"}
                      labelText={
                        <span>
                          Diseño <small>(requerido)</small>
                        </span>
                      }
                      id="designName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "designName", "length", 5),
                        type: "text",
                        endAdornment:
                          this.state.designNameState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    style={{
                      marginTop: "20px"
                    }}
                  >
                    <Select
                      value={this.state.selectBrand}
                      onChange={selectedOption =>
                        this.handleChangeBrand(selectedOption)
                      }
                      options={this.state.brands}
                      placeholder={"Seleccione una marca"}
                    />
                    <br />
                    {this.state.brandState === "error" && (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Una Marca
                        <Close />
                      </InputAdornment>
                    )}
                    <br />
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="warning" onClick={this.handleSubmit.bind(this)}>
                Guardar
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(validationFormsStyle)(CreateDesign);
