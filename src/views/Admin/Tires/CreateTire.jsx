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
import Accordion from "components/Accordion/Accordion.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

// Services
import { createTireService } from "../../../services/tireService";
import { getDesignsService } from "../../../services/designService";
import { getSellersProfiles } from "../../../services/profileService";

// Utils
import { capitalizeFirstLetter } from "../../../utils/formatters";

import Point from "./Point";

class CreateTire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tireName: "",
      tireNameState: "",
      tireCode: "",
      tireCodeState: "",
      tireDesc: "",
      tireDescState: "",
      design: "",
      designState: "",
      designs: [],
      profiles: [],
      accordion: [],
      tirePoints: []
    };
    this.isValidated = this.isValidated.bind(this);
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataTire = {
        name: this.state.tireName,
        tire_code: this.state.tireCode,
        description: this.state.tireDesc,
        design_id: this.state.design.id,
        tire_points: this.state.tirePoints
      };
      createTireService(dataTire).then(responseSaveTire => {
        if (responseSaveTire.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Llanta Creada con Éxito`
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

  handleChangeDesign = design => {
    this.setState({ design: design, designState: "success" });
  };

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
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

  componentDidMount() {
    this.loadDesigns();
    this.loadProfiles();
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

  async loadProfiles() {
    try {
      const { data } = await getSellersProfiles();
      this.setState({ profiles: data });
      this.setPointsAccordion();
    } catch (error) {
      console.log(error);
    }
  }

  setPointsAccordion() {
    const { classes } = this.props;
    const pointsTires = [];
    const accordion = this.state.profiles.map(profile => {
      const point = {
        profiles_id: profile.id,
        points_general: 0,
        points_uhp: 0,
        points_total: 0
      };

      pointsTires.push(point);

      return {
        title: capitalizeFirstLetter(profile.name),
        content: (
          <Point
            point={point}
            onChange={(field, value) =>
              this.handlePointChange(profile.id, field, value)
            }
            classes={classes}
          />
        )
      };
    });
    this.setState({ accordion });
    this.setState({ tirePoints: pointsTires });
  }

  isValidated() {
    if (
      this.state.tireNameState === "success" &&
      this.state.tireCodeState === "success" &&
      this.state.tireDescState === "success" &&
      this.state.designState === "success"
    ) {
      return true;
    } else {
      if (this.state.tireNameState !== "success") {
        this.setState({ tireNameState: "error" });
      }
      if (this.state.tireCodeState !== "success") {
        this.setState({ tireCodeState: "error" });
      }
      if (this.state.tireDescState !== "success") {
        this.setState({ tireDescState: "error" });
      }
      if (this.state.designState !== "success") {
        this.setState({ designState: "error" });
      }
    }
    return false;
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handlePointChange = (profileId, field, value) => {
    const newTirePoints = [...this.state.tirePoints];
    const point = newTirePoints.find(p => p.profiles_id === profileId);
    if (point) {
      point[field] = value;
    } else {
      console.error(`No se encontró el punto con profiles_id: ${profileId}`);
    }
    this.setState({ tirePoints: newTirePoints });
  };

  render() {
    const { classes } = this.props;

    const { messageError, successMessage, accordion } = this.state;

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
                <h4 className={classes.cardTitle}>Crear Llanta</h4>
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
                          Medida <small>(requerido)</small>
                        </span>
                      }
                      id="tireName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "tireName", "length", 5),
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
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.tireCodeState === "success"}
                      error={this.state.tireCodeState === "error"}
                      labelText={
                        <span>
                          Codigo <small>(requerido)</small>
                        </span>
                      }
                      id="tireCode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "tireCode", "length", 5),
                        type: "text",
                        endAdornment:
                          this.state.tireCodeState === "error" ? (
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
                      success={this.state.tireDescState === "success"}
                      error={this.state.tireDescState === "error"}
                      labelText={
                        <span>
                          Descripción <small>(requerido)</small>
                        </span>
                      }
                      id="tireDesc"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "tireDesc", "length", 5),
                        type: "text",
                        endAdornment:
                          this.state.tireDescState === "error" ? (
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
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <h4>Puntos</h4>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Accordion active={0} collapses={accordion} />
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

export default withStyles(validationFormsStyle)(CreateTire);
