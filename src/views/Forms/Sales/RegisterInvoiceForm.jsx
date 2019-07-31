import React from "react";
import Select from "react-select";
import Datetime from "react-datetime";

import { sessionService } from "redux-react-session";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// material ui icons
import Close from "@material-ui/icons/Close";
import Help from "@material-ui/icons/Help";

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
import { getWheelsByDesignId } from "../../../services/wheelService";
import { insertInvoice } from "../../../services/invoiceService";

import * as sessionActions from "../../../actions/sessionActions";

class registerInvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    const amounts = [];
    for (let i = 1; i <= 24; i++) {
      amounts.push({ value: i, label: i });
    }
    this.state = {
      wheels: [
        {
          brandState: "",
          designState: "",
          wheelState: "",
          amountState: "",
          amount: 0
        }
      ],
      dateState: "",
      invoiceNumberState: "",
      totalInvoiceState: "",
      imageState: "",
      amounts: amounts
    };
    this.isValidated = this.isValidated.bind(this);
    this.addWheel = this.addWheel.bind(this);
    this.deleteWheel = this.deleteWheel.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  addWheel() {
    const currentWheels = this.state.wheels;
    const lastWheelIndex = currentWheels.length - 1;
    const lastWheel = currentWheels[lastWheelIndex];
    if (lastWheel.rin_id === undefined) {
      const lastWheelIndex = currentWheels.length - 1;
      currentWheels[lastWheelIndex].brandState = "error";
      currentWheels[lastWheelIndex].designState = "error";
      currentWheels[lastWheelIndex].wheelState = "error";
    } else {
      if (lastWheel.amount === 0) {
        currentWheels[lastWheelIndex].amountState = "error";
      } else {
        currentWheels.push({
          brandState: "",
          designState: "",
          wheelState: "",
          amountState: "",
          amount: 0
        });
      }
    }
    this.setState({ wheels: currentWheels });
  }
  deleteWheel(index) {
    const currentWheels = this.state.wheels;
    if (index > 0) {
      currentWheels.splice(index, 1);
    }
    this.setState({ wheels: currentWheels });
  }
  handleChangeImage = image => {
    this.setState({ image: image, imageState: "success" });
  };
  handleChangeDate = date => {
    if (date._d !== undefined) {
      const selectDate = date._d.toISOString().substr(0, 10);
      this.setState({ date: selectDate, dateState: "success" });
    } else {
      this.setState({ date: null, dateState: "error" });
    }
  };

  handleRemoveImage = () => {
    this.setState({ imageState: "error" });
  };
  handleChangeBrand = (brand, index) => {
    getDesignsByBrandId(brand.id).then(designInfo => {
      const designSelectData = designInfo.data.map(design => {
        design.value = design.id;
        design.label = design.name;
        return design;
      });
      const currentWheels = this.state.wheels;
      currentWheels[index].brandState = "success";
      currentWheels[index].selectBrand = brand;
      this.setState({ designs: designSelectData, wheels: currentWheels });
    });
  };
  handleChangeDesign = (design, index) => {
    getWheelsByDesignId(design.id).then(wheelInfo => {
      const wheelSelectData = wheelInfo.data.map(wheel => {
        wheel.value = wheel.id;
        wheel.label = wheel.name;
        return wheel;
      });
      const currentWheels = this.state.wheels;
      currentWheels[index].designState = "success";
      currentWheels[index].selectDesign = design;
      this.setState({ selectWheels: wheelSelectData, wheels: currentWheels });
    });
  };
  handleChangeWheel = (wheel, index) => {
    const currentWheels = this.state.wheels;
    currentWheels[index].wheelState = "success";
    currentWheels[index].rin_id = wheel.id;
    currentWheels[index].selectWheel = wheel;
    this.setState({ wheels: currentWheels });
  };
  handleChangeAmount = (amount, index) => {
    const currentWheels = this.state.wheels;
    currentWheels[index].amountState = "success";
    currentWheels[index].amount = amount.value;
    currentWheels[index].selectedAmount = amount;
    this.setState({ wheels: currentWheels });
  };
  handleSubmit() {
    if (this.isValidated()) {
      const dataInvoice = {
        invoiceNumber: this.state.invoiceNumber,
        totalAmount: this.state.totalInvoice,
        subsidiaryId: this.state.subsidiaryId,
        date: this.state.date,
        rines: this.state.wheels,
        image: this.state.image
      };
      console.log("dataInvoice", dataInvoice);
      insertInvoice(dataInvoice).then(responseSaveInvoice => {
        if (responseSaveInvoice.data.message === "success") {
          this.props.SessionActions.setPoints(
            responseSaveInvoice.data.currentPoints
          );
          this.setState({
            messageError: null,
            successMessage: `Factura Creada con Éxito, Se le han agregado ${
              responseSaveInvoice.data.points
            } puntos`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/invoices-list`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveInvoice.data.detail,
            successMessage: null
          });
        }
      });
    } else {
      console.log("que paso?");
    }
  }
  componentDidMount() {
    getBrands().then(brandInfo => {
      const brandSelectData = brandInfo.data.map(brand => {
        brand.value = brand.id;
        brand.label = brand.name;
        brand.key = 0;
        return brand;
      });
      this.setState({ brands: brandSelectData });
    });
    sessionService
      .loadUser()
      .then(user => {
        this.setState({ userId: user.id, subsidiaryId: user.subsidiary_id });
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
  isWheelsValidate() {
    let error = "error";
    const { wheels } = this.state;
    const currentWheels = wheels.map(wheel => {
      if (
        wheel.brandState === "success" &&
        wheel.designState === "success" &&
        wheel.wheelState === "success" &&
        wheel.amountState === "success"
      ) {
        error = "success";
        return wheel;
      } else {
        if (wheel.brandState !== "success") {
          wheel.brandState = "error";
        }
        if (wheel.designState !== "success") {
          wheel.designState = "error";
        }
        if (wheel.wheelState !== "success") {
          wheel.wheelState = "error";
        }
        if (wheel.amountState !== "success") {
          wheel.amountState = "error";
        }
        return wheel;
      }
    });
    this.setState({ wheels: currentWheels });
    return error;
  }
  isValidated() {
    const wheelsState = this.isWheelsValidate();
    if (
      this.state.dateState === "success" &&
      this.state.invoiceNumberState === "success" &&
      this.state.totalInvoiceState === "success" &&
      this.state.imageState === "success" &&
      wheelsState === "success"
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
    }
    return false;
  }
  // Let's use the static moment reference in the Datetime component
  validDate(current) {
    const yesterday = Datetime.moment("20190301");
    return current.isAfter(yesterday);
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

    const wheels = this.state.wheels.map((wheel, key) => {
      return (
        <div key={key}>
          <GridContainer>
            <GridItem xs={12} sm={3}>
              <Select
                value={wheel.selectBrand}
                onChange={selectedOption =>
                  this.handleChangeBrand(selectedOption, key)
                }
                options={this.state.brands}
                placeholder={"Seleccione una marca"}
              />
              <br />
              {wheel.brandState === "error" ? (
                <InputAdornment position="end" className={classes.danger}>
                  Seleccione Una Marca
                  <Close />
                </InputAdornment>
              ) : (
                ""
              )}
              <br />
            </GridItem>
            <GridItem xs={12} sm={3}>
              <Select
                value={wheel.selectedDesign}
                onChange={selectedOption =>
                  this.handleChangeDesign(selectedOption, key)
                }
                options={this.state.designs}
                placeholder={"Seleccione un diseño"}
                maxMenuHeight={200}
              />
              <br />
              {wheel.designState === "error" ? (
                <InputAdornment position="end" className={classes.danger}>
                  Seleccione Un Diseño
                  <Close />
                </InputAdornment>
              ) : (
                ""
              )}
              <br />
            </GridItem>
            <GridItem xs={12} sm={3}>
              <Select
                value={wheel.selectWheel}
                onChange={selectedOption =>
                  this.handleChangeWheel(selectedOption, key)
                }
                options={this.state.selectWheels}
                placeholder={"Ancho | Perfil | Rin"}
                maxMenuHeight={200}
              />
              <br />
              {wheel.wheelState === "error" ? (
                <InputAdornment position="end" className={classes.danger}>
                  Seleccione Un Rin
                  <Close />
                </InputAdornment>
              ) : (
                ""
              )}
              <br />
            </GridItem>
            <GridItem xs={12} sm={2}>
              <Select
                value={wheel.selectedAmount}
                onChange={selectedOption =>
                  this.handleChangeAmount(selectedOption, key)
                }
                options={this.state.amounts}
                placeholder={"Cantidad"}
                maxMenuHeight={200}
              />
              <br />
              {wheel.amountState === "error" ? (
                <InputAdornment position="end" className={classes.danger}>
                  Seleccione Una Cantidad
                  <Close />
                </InputAdornment>
              ) : (
                ""
              )}
              <br />
            </GridItem>
            <GridItem xs={12} sm={1}>
              <Button
                color="danger"
                size="sm"
                className={classes.marginRight}
                onClick={e => this.deleteWheel(key)}
              >
                X
              </Button>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      );
    });

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
                    <InputLabel className={classes.label}>
                      Fecha de Factura (Requerido)
                    </InputLabel>
                    <br />
                    <FormControl fullWidth>
                      <Datetime
                        timeFormat={false}
                        inputProps={{ placeholder: "Fecha de Factura" }}
                        onChange={this.handleChangeDate}
                        closeOnSelect
                        isValidDate={this.validDate}
                      />
                    </FormControl>
                    <br />
                    <br />
                    {this.state.dateState === "error" ? (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Una Fecha
                        <Close />
                      </InputAdornment>
                    ) : (
                      ""
                    )}
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
                  <GridItem xs={12} sm={3} md={3}>
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
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Una Imagen
                        <Close />
                      </InputAdornment>
                    ) : (
                      ""
                    )}
                  </GridItem>
                </GridContainer>
                <br />
                {wheels}
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <Button
                      color="success"
                      size="sm"
                      className={classes.marginRight}
                      onClick={this.addWheel}
                    >
                      Agregar
                    </Button>
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
        {errorDiv}
        {successDiv}
        <GridItem>
          <SnackbarContent
            message={
              "Si necesitas agregar una llanta por favor contáctanos en la linea CAU 3013211294."
            }
            icon={Help}
            color="info"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SessionActions: bindActionCreators(sessionActions, dispatch)
  };
}

export default compose(
  withStyles(validationFormsStyle),
  connect(
    null,
    mapDispatchToProps
  )
)(registerInvoiceForm);
