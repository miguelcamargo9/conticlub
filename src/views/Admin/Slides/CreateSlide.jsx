import React from "react";
import Select from "react-select";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// material ui icons
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

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

import { insertSlideService } from "../../../services/slideService";

class CreateSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      orderState: "",
      positionState: "",
      imageState: "",
      positions: [
        { value: "Down", label: "Abajo" },
        { value: "Up", label: "Arriba" }
      ]
    };
    this.isValidated = this.isValidated.bind(this);
  }
  handleChangeImage = image => {
    this.setState({ image: image, imageState: "success" });
  };

  handleRemoveImage = () => {
    this.setState({ imageState: "error" });
  };
  handleChangePosition = position => {
    this.setState({ position, positionState: "success" });
  };

  handleSubmit() {
    if (this.isValidated()) {
      const dataSlide = {
        order: this.state.order,
        position: this.state.position,
        image: this.state.image,
        responsive: this.state.checked.length > 0 ? 1 : 0
      };
      insertSlideService(dataSlide).then(responseSaveSlide => {
        if (responseSaveSlide.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Slide creado exitosamente`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-slides`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveSlide.data.message,
            successMessage: null
          });
        }
      });
    } else {
      console.log("No estan diligenciados los campos");
    }
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
      default:
        break;
    }

    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.orderState === "success" &&
      this.state.positionState === "success" &&
      this.state.imageState === "success"
    ) {
      return true;
    } else {
      if (this.state.orderState !== "success") {
        this.setState({ orderState: "error" });
      }
      if (this.state.positionState !== "success") {
        this.setState({ positionState: "error" });
      }
      if (this.state.imageState !== "success") {
        this.setState({ imageState: "error" });
      }
    }
    return false;
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
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
                <h4 className={classes.cardTitle}>Ingresar Slide</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <CustomInput
                      success={this.state.orderState === "success"}
                      error={this.state.orderState === "error"}
                      labelText={
                        <span>
                          Orden <small>(requerido)</small>
                        </span>
                      }
                      id="order"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "order", "number"),
                        type: "text",
                        endAdornment:
                          this.state.nameState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <div className={classes.checkboxAndRadio}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(2)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Responsive"
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <br />
                    <Select
                      value={this.state.selectPosition}
                      onChange={selectedOption =>
                        this.handleChangePosition(selectedOption)
                      }
                      options={this.state.positions}
                      placeholder={"Seleccione una posición"}
                    />
                    <br />
                    {this.state.positionState === "error" ? (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Una Posición
                        <Close />
                      </InputAdornment>
                    ) : (
                      ""
                    )}
                    <br />
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
                      uploadButtonText="Subir Slide (Requerido)"
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

export default withStyles(validationFormsStyle)(CreateSlide);
