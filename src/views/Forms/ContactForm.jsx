import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
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

import { sendMailService } from "../../services/contactService";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

class contactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      subjectState: "",
      description: "",
      descriptionState: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (
      this.state.subjectState === "success" &&
      this.state.descriptionState === "success"
    ) {
      return true;
    } else {
      if (this.state.subjectState === "") {
        this.setState({ subjectState: "error" });
      }
      if (this.state.descriptionState === "") {
        this.setState({ descriptionState: "error" });
      }
    }
    return false;
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataMail = {
        subject: this.state.subject,
        description: this.state.description
      };
      sendMailService(dataMail).then(responseSendMail => {
        if (responseSendMail.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Correo enviado con éxito.`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/home`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSendMail.data.detail,
            successMessage: null
          });
        }
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" text>
              <CardText color="warning">
                <h4 className={classes.cardTitle}>
                  Escríbenos tus dudas y comentarios
                </h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <p>
                Para Continental es importante saber lo que piensas, por eso
                abrimos este espacio para que puedas tener una comunicación
                directa con nosotros y así poder solventar cualquier cosas que
                necesites.
              </p>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Asunto
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={7}>
                    <CustomInput
                      success={this.state.subjectState === "success"}
                      error={this.state.subjectState === "error"}
                      id="subject"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "subject", "length", 5),
                        type: "text",
                        endAdornment:
                          this.state.subjectState === "error" ? (
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
                    <FormLabel className={classes.labelLeftHorizontal}>
                      <code>requerido</code>
                    </FormLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Descripción
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={7}>
                    <CustomInput
                      success={this.state.descriptionState === "success"}
                      error={this.state.descriptionState === "error"}
                      id="description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "description", "length", 20),
                        type: "text",
                        endAdornment:
                          this.state.descriptionState === "error" ? (
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
                    <FormLabel className={classes.labelLeftHorizontal}>
                      <code>requerido</code>
                    </FormLabel>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="warning" onClick={this.handleSubmit}>
                Enviar
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(validationFormsStyle)(contactForm);
