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

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

import { getTireById, updateTireService } from "../../../services/tireService";
import { getDesignsService } from "../../../services/designService";

class EditTire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tireName: "",
      tireNameState: "success",
      design: "",
      designState: "success",
      designs: []
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
    this.loadDesigns();
    getTireById(this.props.match.params.id)
      .then(responeTire => {
        const design = responeTire.data.design;
        const selectDesign = {
          ...design,
          value: design.id,
          label: design.name
        };
        this.setState({
          tireName: responeTire.data.name,
          selectDesign: selectDesign
        });
      })
      .catch(e => console.log("error", e));
  }

  async loadDesigns() {
    try {
      const designInfo = await getDesignsService();
      const designSelectData = designInfo.data.map(design => {
        design.value = design.id;
        design.label = design.name;
        return design;
      });
      this.setState({ designs: designSelectData });
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataTire = {
        id: this.props.match.params.id,
        name: this.state.tireName,
        design_id: this.state.selectDesign.id
      };
      updateTireService(dataTire).then(responseSaveTire => {
        if (responseSaveTire.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Llanta ${this.state.tireName} editado con éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-tires`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveTire.data.message,
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
    if (
      this.state.tireNameState === "success" &&
      this.state.designState === "success"
    ) {
      return true;
    } else {
      if (this.state.tireNameState !== "success") {
        this.setState({ tireNameState: "error" });
      }
      if (this.state.designState !== "success") {
        this.setState({ designState: "error" });
      }
    }
    return false;
  }

  handleChangeDesign = design => {
    this.setState({ selectDesign: design, designState: "success" });
  };

  handleChangeProfile = profile => {
    this.setState({ selectProfile: profile, profileState: "success" });
  };

  render() {
    const { classes } = this.props;

    const { messageError, successMessage, tireName } = this.state;

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
                <h4 className={classes.cardTitle}>Editar Llanta</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.tireNameState === "success"}
                      error={this.state.tireNameState === "error"}
                      labelText={
                        <span>
                          Llanta <small>(requerido)</small>
                        </span>
                      }
                      id="tireName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: tireName,
                        onChange: event =>
                          this.change(event, "tireName", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.tireNameState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    style={{
                      marginTop: "20px"
                    }}
                  >
                    <Select
                      value={this.state.selectDesign}
                      onChange={selectedOption =>
                        this.handleChangeDesign(selectedOption)
                      }
                      options={this.state.designs}
                      placeholder={"Seleccione una diseño"}
                    />
                    <br />
                    {this.state.designState === "error" && (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Una Diseño
                        <Close />
                      </InputAdornment>
                    )}
                    <br />
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

export default withStyles(validationFormsStyle)(EditTire);
