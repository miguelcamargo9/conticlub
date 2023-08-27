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

import ListTires from "../Tires/ListTires";

import {
  getDesignById,
  updateDesignService
} from "../../../services/designService";
import { getBrands } from "../../../services/brandService";

class EditDesign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designName: "",
      designNameState: "success",
      brand: "",
      brandState: "success",
      brands: []
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
    this.loadBrands();
    getDesignById(this.props.match.params.id)
      .then(responeDesign => {
        const brand = responeDesign.data.brand;
        const selectBrand = {
          ...brand,
          value: brand.id,
          label: brand.name
        };
        this.setState({
          designName: responeDesign.data.name,
          selectBrand: selectBrand
        });
      })
      .catch(e => console.log("error", e));
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

  handleSubmit() {
    if (this.isValidated()) {
      const dataDesign = {
        id: this.props.match.params.id,
        name: this.state.designName,
        brand_id: this.state.selectBrand.id
      };
      updateDesignService(dataDesign).then(responseSaveDesign => {
        if (responseSaveDesign.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Diseño ${this.state.designName} editado con éxito`
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

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
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

  handleChangeBrand = brand => {
    this.setState({ selectBrand: brand, brandState: "success" });
  };

  handleChangeProfile = profile => {
    this.setState({ selectProfile: profile, profileState: "success" });
  };

  render() {
    const { classes } = this.props;

    const { messageError, successMessage, designName } = this.state;

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
                <h4 className={classes.cardTitle}>Editar Diseño</h4>
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
                        value: designName,
                        onChange: event =>
                          this.change(event, "designName", "length", 3),
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
        <GridItem xs={12} sm={12} md={12}>
          <ListTires designId={this.props.match.params.id} />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(validationFormsStyle)(EditDesign);
