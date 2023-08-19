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

import {
  getSubsidiaryById,
  updateSubsidiary
} from "../../../services/subsidiaryService";
import { getCities } from "../../../services/cityService";
import { getSellersProfiles } from "../../../services/profileService";

class EditSubsidiary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subsidiaryName: "",
      subsidiaryNameState: "success",
      city: "",
      cityState: "success",
      cities: [],
      profile: "",
      profileState: "success",
      profiles: []
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
    this.loadCities();
    this.loadProfiles();
    getSubsidiaryById(this.props.match.params.id)
      .then(responeSubsidiary => {
        const city = responeSubsidiary.data.city;
        const selectCity = {
          ...city,
          value: city.id,
          label: city.name
        };
        const profile = responeSubsidiary.data.profile;
        const selectProfile = {
          ...profile,
          value: profile.id,
          label: profile.name
        };
        this.setState({
          subsidiaryName: responeSubsidiary.data.name,
          selectCity: selectCity,
          selectProfile: selectProfile
        });
      })
      .catch(e => console.log("error", e));
  }

  async loadCities() {
    try {
      const cityInfo = await getCities();
      const citySelectData = cityInfo.data.map(city => {
        city.value = city.id;
        city.label = city.name;
        return city;
      });
      this.setState({ cities: citySelectData });
    } catch (error) {
      console.log(error);
    }
  }

  async loadProfiles() {
    try {
      const profileInfo = await getSellersProfiles();
      const profileSelectData = profileInfo.data.map(profile => {
        profile.value = profile.id;
        profile.label = profile.name;
        return profile;
      });
      this.setState({ profiles: profileSelectData });
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataSubsidiary = {
        id: this.props.match.params.id,
        subsidiaryName: this.state.subsidiaryName,
        cityId: this.state.selectCity.id,
        profileId: this.state.selectProfile.id
      };
      updateSubsidiary(dataSubsidiary).then(responseSaveSubsidiary => {
        if (responseSaveSubsidiary.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Sucursal ${
              this.state.subsidiaryName
            } editada con éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-subsidiaries`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveSubsidiary.data.message,
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
      this.state.subsidiaryNameState === "success" &&
      this.state.cityState === "success" &&
      this.state.profileState === "success"
    ) {
      return true;
    } else {
      if (this.state.subsidiaryNameState !== "success") {
        this.setState({ subsidiaryNameState: "error" });
      }
      if (this.state.cityState !== "success") {
        this.setState({ cityState: "error" });
      }
      if (this.state.profileState !== "success") {
        this.setState({ profileState: "error" });
      }
    }
    return false;
  }

  handleChangeCity = city => {
    this.setState({ selectCity: city, cityState: "success" });
  };

  handleChangeProfile = profile => {
    this.setState({ selectProfile: profile, profileState: "success" });
  };

  render() {
    const { classes } = this.props;

    const { messageError, successMessage, subsidiaryName } = this.state;

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
                <h4 className={classes.cardTitle}>Editar Sucursal</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      success={this.state.subsidiaryNameState === "success"}
                      error={this.state.subsidiaryNameState === "error"}
                      labelText={
                        <span>
                          Sucursal <small>(requerido)</small>
                        </span>
                      }
                      id="subsidiaryName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: subsidiaryName,
                        onChange: event =>
                          this.change(event, "subsidiaryName", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.subsidiaryNameState === "error" ? (
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
                    <Select
                      value={this.state.selectCity}
                      onChange={selectedOption =>
                        this.handleChangeCity(selectedOption)
                      }
                      options={this.state.cities}
                      placeholder={"Seleccione una ciudad"}
                      styles={{
                        marginTop: "20px"
                      }}
                    />
                    <br />
                    {this.state.cityState === "error" && (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Una Ciudad
                        <Close />
                      </InputAdornment>
                    )}
                    <br />
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <Select
                      value={this.state.selectProfile}
                      onChange={selectedOption =>
                        this.handleChangeProfile(selectedOption)
                      }
                      options={this.state.profiles}
                      placeholder={"Seleccione un perfil"}
                    />
                    <br />
                    {this.state.profileState === "error" && (
                      <InputAdornment position="end" className={classes.danger}>
                        Seleccione Un Perfil
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

export default withStyles(validationFormsStyle)(EditSubsidiary);
