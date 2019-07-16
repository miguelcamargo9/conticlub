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
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

import { getCategoriesService } from "../../../services/productCategoryService";
import { insertProduct } from "../../../services/productService";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryState: "",
      nameState: "",
      pointsState: "",
      pointsValueState: "",
      estimatedValueState: "",
      imageState: ""
    };
    this.isValidated = this.isValidated.bind(this);
  }
  handleChangeImage = image => {
    this.setState({ image: image, imageState: "success" });
  };

  handleRemoveImage = () => {
    this.setState({ imageState: "error" });
  };
  handleChangeCategories = category => {
    this.setState({ productCategoryId: category, categoryState: "success" });
  };

  handleSubmit() {
    if (this.isValidated()) {
      const dataProduct = {
        name: this.state.name,
        points: this.state.points,
        productCategoryId: this.state.productCategoryId.id,
        pointsValue: this.state.pointsValue,
        estimatedValue: this.state.estimatedValue,
        image: this.state.image
      };
      insertProduct(dataProduct).then(responseSaveProduct => {
        if (responseSaveProduct.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Producto creado exitosamente`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-products`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveProduct.data.message,
            successMessage: null
          });
        }
      });
    } else {
      console.log("No estan diligenciados los campos");
    }
  }
  componentDidMount() {
    getCategoriesService().then(categoryInfo => {
      const categorySelectData = categoryInfo.data.map(category => {
        category.value = category.id;
        category.label = category.name;
        category.key = 0;
        return category;
      });
      this.setState({ categories: categorySelectData });
    });
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
      this.state.nameState === "success" &&
      this.state.pointsState === "success" &&
      this.state.categoryState === "success" &&
      this.state.pointsValueState === "success" &&
      this.state.estimatedValueState === "success" &&
      this.state.imageState === "success"
    ) {
      return true;
    } else {
      if (this.state.nameState !== "success") {
        this.setState({ nameState: "error" });
      }
      if (this.state.pointsState !== "success") {
        this.setState({ pointsState: "error" });
      }
      if (this.state.categoryState !== "success") {
        this.setState({ categoryState: "error" });
      }
      if (this.state.pointsValueState !== "success") {
        this.setState({ pointsValueState: "error" });
      }
      if (this.state.estimatedValueState !== "success") {
        this.setState({ estimatedValueState: "error" });
      }
      if (this.state.imageState !== "success") {
        this.setState({ imageState: "error" });
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
                <h4 className={classes.cardTitle}>Ingresar Producto</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.nameState === "success"}
                      error={this.state.nameState === "error"}
                      labelText={
                        <span>
                          Nombre del Producto <small>(requerido)</small>
                        </span>
                      }
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "name", "length", 3),
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
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.pointsState === "success"}
                      error={this.state.pointsState === "error"}
                      labelText={
                        <span>
                          Puntos <small>(requerido)</small>
                        </span>
                      }
                      id="points"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "points", "number", 3),
                        type: "text",
                        endAdornment:
                          this.state.pointsState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <Select
                      value={this.state.selectCategory}
                      onChange={selectedOption =>
                        this.handleChangeCategories(selectedOption)
                      }
                      options={this.state.categories}
                      placeholder={"Seleccione una categoría"}
                    />
                    <br />
                    {this.state.categoryState === "error" ? (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Una Categoría
                        <Close />
                      </InputAdornment>
                    ) : (
                      ""
                    )}
                    <br />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.pointsValueState === "success"}
                      error={this.state.pointsValueState === "error"}
                      labelText={
                        <span>
                          Costo en puntos <small>(requerido)</small>
                        </span>
                      }
                      id="pointsValue"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "pointsValue", "number", 3),
                        type: "text",
                        endAdornment:
                          this.state.pointsValueState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.estimatedValueState === "success"}
                      error={this.state.estimatedValueState === "error"}
                      labelText={
                        <span>
                          Costo estimado en $COP <small>(requerido)</small>
                        </span>
                      }
                      id="estimatedValue"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "estimatedValue", "number", 3),
                        type: "text",
                        endAdornment:
                          this.state.estimatedValueState === "error" ? (
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
                <GridContainer justify="center">
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
                      uploadButtonText="Subir Imagen Producto (Requerido)"
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

export default withStyles(validationFormsStyle)(CreateProduct);
