import React from "react";
import Select from "react-select";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
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
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

import { getBrands } from "../../../services/brandService";
import { getDesignsByBrandId } from "../../../services/designService";
import { getWhellsByDesignId } from "../../../services/whellService";
import { insertInvoice } from "../../../services/invoiceService";

class registerInvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wheels: [{}],
      // register form
      registerEmail: "",
      registerEmailState: "",
      registerPassword: "",
      registerPasswordState: "",
      registerConfirmPassword: "",
      registerConfirmPasswordState: "",
      registerCheckbox: false,
      registerCheckboxState: "",
      // login form
      loginEmail: "",
      loginEmailState: "",
      loginPassword: "",
      loginPasswordState: "",
      // type validation
      required: "",
      requiredState: "",
      typeEmail: "",
      typeEmailState: "",
      number: "",
      numberState: "",
      url: "",
      urlState: "",
      equalTo: "",
      whichEqualTo: "",
      equalToState: "",
      // range validation
      minLength: "",
      minLengthState: "",
      maxLength: "",
      maxLengthState: "",
      range: "",
      rangeState: "",
      minValue: "",
      minValueState: "",
      maxValue: "",
      maxValueState: ""
    };
    this.typeClick = this.typeClick.bind(this);
  }
  addWhell() {
    // const currentWheels = this.state.wheels;
    // currentWheels.push({});
    // this.setState({ wheels: currentWheels });
  }
  handleChangeImage = image => {
    this.setState({ image: image });
  };
  handleChangeBrand = brand => {
    let designSelectData = [];
    getDesignsByBrandId(brand.id).then(designInfo => {
      designSelectData = designInfo.data.map((design, index) => {
        design.value = design.id;
        design.label = design.name;
        return design;
      });
      this.setState({ designs: designSelectData });
    });
  };
  handleChangeDesign = design => {
    let whellSelectData = [];
    getWhellsByDesignId(design.id).then(whellInfo => {
      whellSelectData = whellInfo.data.map((whell, index) => {
        whell.value = whell.id;
        whell.label = whell.name;
        return whell;
      });
      this.setState({ selectWhells: whellSelectData });
    });
  };
  handleChangeWhell = whell => {
    this.setState({ selectWhell: whell });
  };
  handleSubmit() {
    console.log(this.state);
    let dataInvoice = {
      invoiceNumber: this.state.invoiceNumber,
      totalAmount: this.state.totalInvoice,
      rines: [
        {
          amount: this.state.amount,
          rin_id: this.state.selectWhell.id
        }
      ],
      image: this.state.image
    };
    console.log(dataInvoice);
    insertInvoice(dataInvoice).then(whellInfo => {
      console.log("whellInfo", whellInfo.data);
    });
  }
  componentDidMount() {
    let brandSelectData = [];
    getBrands().then(brandInfo => {
      brandSelectData = brandInfo.data.map((brand, index) => {
        brand.value = brand.id;
        brand.label = brand.name;
        return brand;
      });
      this.setState({ brands: brandSelectData });
    });
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  // function that verifies if value contains only numbers
  verifyNumber(value) {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }
  // verifies if value is a valid URL
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
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
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }
  typeClick() {
    if (this.state.requiredState === "") {
      this.setState({ requiredState: "error" });
    }
    if (this.state.typeEmailState === "") {
      this.setState({ typeEmailState: "error" });
    }
    if (this.state.numberState === "") {
      this.setState({ numberState: "error" });
    }
    if (this.state.urlState === "") {
      this.setState({ urlState: "error" });
    }
    if (this.state.equalToState === "") {
      this.setState({ equalToState: "error" });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" text>
              <CardText color="warning">
                <h4 className={classes.cardTitle}>Ingresar Venta</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Fecha de Factura
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <CustomInput
                      success={this.state.requiredState === "success"}
                      error={this.state.requiredState === "error"}
                      id="date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "date", "length", 0),
                        type: "date",
                        endAdornment:
                          this.state.requiredState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      success={this.state.typeEmailState === "success"}
                      error={this.state.typeEmailState === "error"}
                      labelText={
                        <span>
                          Número de Factura <small>(requerido)</small>
                        </span>
                      }
                      id="invoiceNumber"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "invoiceNumber", "length", 5),
                        type: "text",
                        endAdornment:
                          this.state.typeEmailState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      success={this.state.typeEmailState === "success"}
                      error={this.state.typeEmailState === "error"}
                      labelText={
                        <span>
                          Costo Total de la Factura <small>(requerido)</small>
                        </span>
                      }
                      id="totalInvoice"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "totalInvoice", "length", 5),
                        type: "text",
                        endAdornment:
                          this.state.typeEmailState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <ImageUpload
                      handleChangeImage={this.handleChangeImage}
                      addButtonProps={{
                        color: "warning",
                        round: true
                      }}
                      changeButtonProps={{
                        color: "warning",
                        round: true
                      }}
                      removeButtonProps={{
                        color: "danger",
                        round: true
                      }}
                      uploadButtonText="Subir Factura"
                      changeButtonText="Cambiar"
                      removeButtonText="Borrar"
                    />
                  </GridItem>
                </GridContainer>
                {this.state.wheels.map((wheel, key) => {
                  return (
                    <div key={key}>
                      <GridContainer>
                        <GridItem xs={12} sm={3}>
                          <Select
                            value={this.selectedOption}
                            onChange={this.handleChangeBrand}
                            options={this.state.brands}
                            placeholder={"Seleccione una marca"}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                          <Select
                            value={this.selectedOption}
                            onChange={this.handleChangeDesign}
                            options={this.state.designs}
                            placeholder={"Seleccione un diseño"}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                          <Select
                            value={this.selectedOption}
                            onChange={this.handleChangeWhell}
                            options={this.state.selectWhells}
                            placeholder={"Ancho | Perfil rin"}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={3}>
                          <CustomInput
                            success={this.state.amountlState === "success"}
                            error={this.state.amountState === "error"}
                            labelText={
                              <span>
                                Cantidad <small>(requerido)</small>
                              </span>
                            }
                            id="amount"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event =>
                                this.change(event, "amount", "number"),
                              type: "number",
                              endAdornment:
                                this.state.amountlState === "error" ? (
                                  <InputAdornment position="end">
                                    <Close className={classes.danger} />
                                  </InputAdornment>
                                ) : (
                                  undefined
                                )
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                          {/* <Button
                            color="success"
                            size="sm"
                            className={classes.marginRight}
                            onClick={this.addWhell()}
                          >
                            Agregar
                          </Button> */}
                        </GridItem>
                      </GridContainer>
                    </div>
                  );
                })}
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

export default withStyles(validationFormsStyle)(registerInvoiceForm);
