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

import {
  getProfileById,
  updateProfile
} from "../../../services/profileService";

class editProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: "",
      profileNameState: ""
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
    getProfileById(this.props.match.params.id)
      .then(responeProfile => {
        this.setState({ profileName: responeProfile.data.name });
      })
      .catch(e => console.log("error", e));
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataProfile = {
        id: this.props.match.params.id,
        name: this.state.profileName
      };
      updateProfile(dataProfile).then(responseSaveProfile => {
        if (responseSaveProfile.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Perfil ${this.state.profileName} Editado con Éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/profiles-list`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveProfile.data.message,
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
    if (this.state.profileNameState === "success") {
      return true;
    } else {
      if (this.state.profileNameState !== "success") {
        this.setState({ dateState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;

    const { messageError, successMessage, profileName } = this.state;

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
                <h4 className={classes.cardTitle}>Editar Perfil</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <CustomInput
                      success={this.state.profileNameState === "success"}
                      error={this.state.profileNameState === "error"}
                      labelText={
                        <span>
                          Nombre de Perfil <small>(requerido)</small>
                        </span>
                      }
                      id="profileName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: profileName,
                        onChange: event =>
                          this.change(event, "profileName", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.profileNameState === "error" ? (
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

export default withStyles(validationFormsStyle)(editProfile);
