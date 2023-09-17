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

import { getCity, updateCity } from "../../../services/cityService";

class EditCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityNameState: "success"
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
    getCity(this.props.match.params.id)
      .then(responeCity => {
        this.setState({
          cityName: responeCity.data.name
        });
      })
      .catch(e => console.log("error", e));
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataCity = {
        id: this.props.match.params.id,
        name: this.state.cityName
      };
      updateCity(dataCity).then(responseSaveCity => {
        if (responseSaveCity.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Ciudad ${this.state.cityName} editada con éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-cities`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveCity.data.message,
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
    if (this.state.cityNameState === "success") {
      return true;
    } else {
      if (this.state.cityNameState !== "success") {
        this.setState({ cityNameState: "error" });
      }
    }
    return false;
  }

  render() {
    const { classes } = this.props;

    const { messageError, successMessage, cityName } = this.state;

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
                <h4 className={classes.cardTitle}>Editar Ciudad</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.cityNameState === "success"}
                      error={this.state.cityNameState === "error"}
                      labelText={
                        <span>
                          Ciudad <small>(requerido)</small>
                        </span>
                      }
                      id="cityName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: cityName,
                        onChange: event =>
                          this.change(event, "cityName", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.cityNameState === "error" ? (
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

export default withStyles(validationFormsStyle)(EditCity);
