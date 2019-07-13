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
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

import { getCategoriesService } from "../../../services/productCategoryService";
import {
  updateProduct,
  getProductByIdService
} from "../../../services/productService";

// utils
import { SERVER_URL } from "../../../constants/server";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryState: "success",
      nameState: "success",
      pointsState: "success",
      pointsValueState: "success",
      estimatedValueState: "success",
      product: {
        name: "",
        points: "",
        points_value: "",
        estimated_value: "",
        image: "",
        category: { id: "", name: "" }
      }
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
    getCategoriesService()
      .then(categoryInfo => {
        const categorySelectData = categoryInfo.data.map(category => {
          category.value = category.id;
          category.label = category.name;
          category.key = 0;
          return category;
        });
        this.setState({ categories: categorySelectData });
      })
      .then(() => {
        getProductByIdService(this.props.match.params.id).then(productInfo => {
          const category = productInfo.data.product_category;
          const selectCategory = {
            ...category,
            value: category.id,
            label: category.name
          };
          this.setState({
            product: productInfo.data,
            selectCategory: selectCategory
          });
        });
      });
  }

  handleChangeImage = image => {
    this.setState({
      image: image,
      imageState: "success"
    });
  };

  handleRemoveImage = () => {
    this.setState({ imageState: "error" });
  };

  handleChangeCategories = category => {
    this.setState({
      categoryState: "success",
      selectCategory: category
    });
  };

  handleSubmit() {
    if (this.isValidated()) {
      const dataProduct = {
        id: this.props.match.params.id,
        name: this.state.product.name,
        points: this.state.product.points,
        points_value: this.state.product.points_value,
        estimated_value: this.state.product.estimated_value,
        category: this.state.product.product_category.id,
        image: this.state.image
      };
      updateProduct(dataProduct).then(responseSaveProduct => {
        if (responseSaveProduct.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Producto ${
              this.state.product.name
            } editado con éxito`
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
      console.log("No has llenado nada amigo!");
    }
  }
  // function that verifies if value contains only numbers
  verifyNumber(value) {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
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

  change(event, stateName, type, stateNameEqualTo, value) {
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

    const product = {
      ...this.state.product,
      [stateName]: event.target.value
    };

    this.setState({ product });
  }

  isValidated() {
    if (
      this.state.nameState === "success" &&
      this.state.pointsState === "success" &&
      this.state.categoryState === "success" &&
      this.state.pointsValueState === "success" &&
      this.state.estimatedValueState === "success"
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
    }
    return false;
  }

  render() {
    const { classes } = this.props;

    const { messageError, successMessage, product } = this.state;

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

    const path =
      SERVER_URL +
      decodeURIComponent((product.image + "").replace(/\+/g, "%20"));

    return (
      <GridContainer>
        {errorDiv}
        {successDiv}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" text>
              <CardText color="warning">
                <h4 className={classes.cardTitle}>Editar Producto</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <CustomInput
                      success={this.state.nameState === "success"}
                      error={this.state.nameState === "error"}
                      labelText={<span>Nombre de Producto</span>}
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: product.name,
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
                      labelText={<span>Puntos</span>}
                      id="points"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: product.points,
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
                    <CustomInput
                      success={this.state.pointsValueState === "success"}
                      error={this.state.pointsValueState === "error"}
                      labelText={<span>Costo en puntos</span>}
                      id="pointsValue"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: product.points_value,
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
                      labelText={<span>Costo estimado en $COP</span>}
                      id="estimatedValue"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.product.estimated_value,
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
                <GridContainer>
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
                        Seleccione una categoría
                        <Close />
                      </InputAdornment>
                    ) : (
                      ""
                    )}
                    <br />
                  </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={3} md={3}>
                    <ImageUpload
                      imagePreview={`${path}`}
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
                      uploadButtonText="Editar Imagen Producto"
                      changeButtonText="Cambiar"
                      removeButtonText="Borrar"
                    />
                    {this.state.imageState === "error" ? (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione una nueva imagen
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

export default withStyles(validationFormsStyle)(EditProduct);
