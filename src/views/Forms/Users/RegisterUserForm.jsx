import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import Step1 from "./RegisterUserSteps/Step1.jsx";
import Step2 from "./RegisterUserSteps/Step2.jsx";
import Step3 from "./RegisterUserSteps/Step3.jsx";

import { createUserService } from "../../../services/userService";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class RegisterUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageError: null,
      successMessage: null
    };
  }

  saveUserInfo(e) {
    console.log("data wizard", e);
    const username = e.about.firstname + " " + e.about.lastname;
    const image = e.about.image !== undefined ? e.about.image : false;
    const email = e.about.email;
    const password = e.address.password;
    const identification_number = e.address.identificationNumber;
    const subsidiary_id = e.account.subsidiary.id;
    const profiles_id = e.account.subsidiary.profiles_id;
    const phone = e.account.phone;

    const data = {
      username,
      email,
      image,
      password,
      identification_number,
      subsidiary_id,
      profiles_id,
      phone
    };

    console.log("data a post", data);
    createUserService(data).then(userInfo => {
      if (userInfo.data.message === "success") {
        this.setState({
          messageError: null,
          successMessage: "Usuario Registrado con Éxito"
        });
        setTimeout(() => {
          this.props.history.push(`/auth/login-page`);
        }, 3000);
      } else {
        this.setState({
          messageError: userInfo.data.message,
          successMessage: null
        });
      }
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
      <div className={classes.container}>
        <GridContainer justify="center">
          {errorDiv}
          {successDiv}
          <GridItem xs={12} sm={8}>
            <Wizard
              validate
              steps={[
                {
                  stepName: "Información General",
                  stepComponent: Step1,
                  stepId: "about"
                },
                {
                  stepName: "Credenciales",
                  stepComponent: Step2,
                  stepId: "address"
                },
                {
                  stepName: "Perfil",
                  stepComponent: Step3,
                  stepId: "account"
                }
              ]}
              title="Registrar Usuario"
              subtitle="Esta información es necesaria para registrarse en el sistema"
              finishButtonClick={e => this.saveUserInfo(e)}
              nextButtonText="Siguiente"
              color="warning"
              finishButtonText="Guardar"
              previousButtonText="Atrás"
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(registerPageStyle)(RegisterUserForm);
