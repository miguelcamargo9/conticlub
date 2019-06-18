import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1 from "./RegisterUserSteps/Step1.jsx";
import Step2 from "./RegisterUserSteps/Step2.jsx";
import Step3 from "./RegisterUserSteps/Step3.jsx";

import { createUserService } from "../../../services/registryService";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class RegisterUserForm extends React.Component {
  saveUserInfo(e) {
    const username = e.about.firstname + " " + e.about.lastname;
    const password = e.address.password;
    const email = e.about.email;
    const identification_number = e.address.identificationNumber;
    const subsidiary_id = e.account.subsidiary.id;

    const data = {
      username,
      password,
      email,
      identification_number,
      subsidiary_id
    };

    console.log("data a post", data);
    // createUserService(data);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
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
