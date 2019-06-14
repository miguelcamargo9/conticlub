import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import Lock from "@material-ui/icons/Lock";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  ...customSelectStyle
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identificationNumber: "",
      identificationNumberState: "",
      password: "",
      passwordState: "",
      confirmPassword: "",
      confirmPasswordState: ""
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
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
  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
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
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    console.log(this.state.identificationNumberState);
    if (
      this.state.identificationNumberState === "success" &&
      this.state.passwordState === "success" &&
      this.state.confirmPasswordState === "success"
    ) {
      return true;
    } else {
      if (this.state.identificationNumberState !== "success") {
        this.setState({ identificationNumberState: "error" });
      }
      if (this.state.passwordState !== "success") {
        this.setState({ passwordState: "error" });
      }
      if (this.state.confirmPasswordState !== "success") {
        this.setState({ confirmPasswordState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={7}>
            <CustomInput
              success={this.state.identificationNumberState === "success"}
              error={this.state.identificationNumberState === "error"}
              labelText={
                <span>
                  Número de Identificación <small>(requerido)</small>
                </span>
              }
              id="identificationNumber"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.change(event, "identificationNumber", "length", 5),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <PictureInPicture className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={5}>
            <CustomInput
              success={this.state.passwordState === "success"}
              error={this.state.passwordState === "error"}
              labelText={
                <span>
                  Contraseña <small>(requerido)</small>
                </span>
              }
              id="password"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "password",
                onChange: event => this.change(event, "password", "password"),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Lock className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={5}>
            <CustomInput
              success={this.state.confirmPasswordState === "success"}
              error={this.state.confirmPasswordState === "error"}
              labelText={
                <span>
                  Confimar Contraseña <small>(requerido)</small>
                </span>
              }
              id="confirmPassword"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "password",
                onChange: event =>
                  this.change(event, "confirmPassword", "equalTo", "password"),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Lock className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Step3);
