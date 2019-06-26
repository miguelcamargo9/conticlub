import React from "react";
import Select from "react-select";

import { sessionService } from "redux-react-session";

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
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

import { getBrands } from "../../../services/brandService";
import { getDesignsByBrandId } from "../../../services/designService";
import { getWhellsByDesignId } from "../../../services/whellService";
import { insertInvoice } from "../../../services/invoiceService";

const selectStylesBrand = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999",
    width: "100%"
  })
};
const selectStylesDesign = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "998",
    width: "100%"
  })
};
const selectStylesWheel = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "997",
    width: "100%"
  })
};
const selectStylesAmount = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "996",
    width: "100%"
  })
};

class registerInvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    const amounts = [];
    for (let i = 1; i <= 24; i++) {
      amounts.push({ value: i, label: i });
    }
    this.state = {
      wheels: [{}],
      dateState: "",
      invoiceNumberState: "",
      totalInvoiceState: "",
      imageState: "",
      brandState: "",
      designState: "",
      wheelState: "",
      amounts: amounts,
      amountState: ""
    };
    this.isValidated = this.isValidated.bind(this);
  }
  addWhell() {
    // const currentWheels = this.state.wheels;
    // currentWheels.push({});
    // this.setState({ wheels: currentWheels });
  }
  handleChangeImage = image => {
    this.setState({ image: image, imageState: "success" });
  };

  handleRemoveImage = () => {
    this.setState({ imageState: "error" });
  };
  handleChangeBrand = brand => {
    let designSelectData = [];
    getDesignsByBrandId(brand.id).then(designInfo => {
      designSelectData = designInfo.data.map((design, index) => {
        design.value = design.id;
        design.label = design.name;
        return design;
      });
      this.setState({ designs: designSelectData, brandState: "success" });
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
      this.setState({ selectWhells: whellSelectData, designState: "success" });
    });
  };
  handleChangeWhell = whell => {
    this.setState({ selectWhell: whell, wheelState: "success" });
  };
  handleChangeAmount = amount => {
    this.setState({ amount: amount.value, amountState: "success" });
  };
  handleSubmit() {
    if (this.isValidated()) {
      console.log(this.state);
      let dataInvoice = {
        invoiceNumber: this.state.invoiceNumber,
        totalAmount: this.state.totalInvoice,
        userId: this.state.userId,
        date: this.state.date,
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
        if (whellInfo.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Factura Creada con Éxito, Se le han agregado ${
              whellInfo.data.points
            } puntos`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/home`);
          }, 3000);
        } else {
          this.setState({
            messageError: whellInfo.data.message,
            successMessage: null
          });
        }
      });
    }
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
    sessionService
      .loadUser()
      .then(user => {
        this.setState({ userId: user.id });
      })
      .catch(err => console.log(err));
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
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
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
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
      default:
        break;
    }

    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.dateState === "success" &&
      this.state.invoiceNumberState === "success" &&
      this.state.totalInvoiceState === "success" &&
      this.state.imageState === "success" &&
      this.state.brandState === "success" &&
      this.state.designState === "success" &&
      this.state.wheelState === "success" &&
      this.state.amountState === "success"
    ) {
      return true;
    } else {
      if (this.state.dateState !== "success") {
        this.setState({ dateState: "error" });
      }
      if (this.state.invoiceNumberState !== "success") {
        this.setState({ invoiceNumberState: "error" });
      }
      if (this.state.totalInvoiceState !== "success") {
        this.setState({ totalInvoiceState: "error" });
      }
      if (this.state.imageState !== "success") {
        this.setState({ imageState: "error" });
      }
      if (this.state.brandState !== "success") {
        this.setState({ brandState: "error" });
      }
      if (this.state.designState !== "success") {
        this.setState({ designState: "error" });
      }
      if (this.state.wheelState !== "success") {
        this.setState({ wheelState: "error" });
      }
      if (this.state.amountState !== "success") {
        this.setState({ amountState: "error" });
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
                <h4 className={classes.cardTitle}>Ingresar Venta</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Fecha de Factura (Requerido)
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <CustomInput
                      success={this.state.dateState === "success"}
                      error={this.state.dateState === "error"}
                      id="date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "date", "length", 0),
                        type: "date",
                        endAdornment:
                          this.state.dateState === "error" ? (
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
                      success={this.state.invoiceNumberState === "success"}
                      error={this.state.invoiceNumberState === "error"}
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
                          this.change(event, "invoiceNumber", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.invoiceNumberState === "error" ? (
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
                      success={this.state.totalInvoiceState === "success"}
                      error={this.state.totalInvoiceState === "error"}
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
                          this.change(event, "totalInvoice", "length", 1),
                        type: "text",
                        endAdornment:
                          this.state.totalInvoiceState === "error" ? (
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
                      handleRemoveImage={this.handleRemoveImage}
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
                      uploadButtonText="Subir Factura (Requerido)"
                      changeButtonText="Cambiar"
                      removeButtonText="Borrar"
                    />

                    {this.state.imageState === "error" ? (
                      <InputAdornment position="end">
                        Seleccione Una Imagen
                        <Close className={classes.danger} />
                      </InputAdornment>
                    ) : (
                      ""
                    )}
                  </GridItem>
                </GridContainer>
                <br />
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
                            styles={selectStylesBrand}
                          />
                          <br />
                          {this.state.brandState === "error" ? (
                            <InputAdornment position="end">
                              Seleccione Una Marca
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            ""
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                          <Select
                            value={this.selectedOption}
                            onChange={this.handleChangeDesign}
                            options={this.state.designs}
                            placeholder={"Seleccione un diseño"}
                            styles={selectStylesDesign}
                          />
                          <br />
                          {this.state.designState === "error" ? (
                            <InputAdornment position="end">
                              Seleccione Un Diseño
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            ""
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                          <Select
                            value={this.selectedOption}
                            onChange={this.handleChangeWhell}
                            options={this.state.selectWhells}
                            placeholder={"Ancho | Perfil rin"}
                            styles={selectStylesWheel}
                          />
                          <br />
                          {this.state.wheelState === "error" ? (
                            <InputAdornment position="end">
                              Seleccione Un Rin
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            ""
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                          <Select
                            value={this.selectedOption}
                            onChange={this.handleChangeAmount}
                            options={this.state.amounts}
                            placeholder={"Cantidad"}
                            styles={selectStylesAmount}
                          />
                          <br />
                          {this.state.amountState === "error" ? (
                            <InputAdornment position="end">
                              Seleccione Una Cantidad
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            ""
                          )}
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
