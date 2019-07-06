import React from "react";

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

import { updateCategory } from "../../../services/productCategoryService";

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryNameState: ""
    };
    this.isValidated = this.isValidated.bind(this);
  }

  handleSubmit() {
    if (this.isValidated()) {
      console.log("location", this.props.location.state.id);
      const dataCategory = {
        id: this.props.location.state.id,
        name: this.state.categoryName
      };
      updateCategory(dataCategory).then(responseSaveCategory => {
        if (responseSaveCategory.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Categoria ${
              this.state.categoryName
            } editada con éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-categories`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveCategory.data.message,
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
    if (this.state.categoryNameState === "success") {
      return true;
    } else {
      if (this.state.categoryNameState !== "success") {
        this.setState({ dateState: "error" });
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
                <h4 className={classes.cardTitle}>Editar Categoría</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <CustomInput
                      success={this.state.categoryNameState === "success"}
                      error={this.state.categoryNameState === "error"}
                      labelText={
                        <span>
                          Nombre de Categoría <small>(requerido)</small>
                        </span>
                      }
                      id="categoryName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        defaultValue: this.props.location.state.categoryName,
                        onChange: event =>
                          this.change(event, "categoryName", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.categoryNameState === "error" ? (
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

export default withStyles(validationFormsStyle)(EditCategory);
