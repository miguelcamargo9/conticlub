import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Select from "react-select";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Lock from "@material-ui/icons/Lock";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import * as userActions from "../../../actions/userActions";
import {
  getUserByIdService,
  updateUserService
} from "../../../services/userService";
import { getProfiles } from "../../../services/profileService";
import { getSubsidiariesService } from "../../../services/subsidiaryService";
import { BUCKET_URL } from "../../../constants/server";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

//avatar
import defaultAvatar from "assets/img/default-avatar.png";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameState: "success",
      emailState: "success",
      phoneState: "success",
      pointsState: "success",
      profileState: "success",
      subsidiaryState: "success",
      stateUserState: "success",
      passwordState: "success",
      confirmPasswordState: "success",
      user: {
        id: "",
        name: "",
        email: "",
        phone: "",
        points: "",
        password: "",
        confirmPassword: "",
        stateUser: "",
        created_at: "",
        profile: { id: "", name: "" },
        subsidiary: { id: "", name: "" }
      }
    };
    this.isValidated = this.isValidated.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    getProfiles()
      .then(profilesInfo => {
        const profileSelectData = profilesInfo.data.map(profile => {
          profile.value = profile.id;
          profile.label = profile.name;
          profile.key = 0;
          return profile;
        });
        this.setState({ profiles: profileSelectData });
      })
      .then(() => {
        getSubsidiariesService().then(subsidiariesInfo => {
          const subsidiarySelectData = subsidiariesInfo.map(subsidiary => {
            subsidiary.value = subsidiary.id;
            subsidiary.label = subsidiary.name;
            subsidiary.key = 0;
            return subsidiary;
          });
          this.setState({ subsidiaries: subsidiarySelectData });
        });
      })
      .then(() => {
        getUserByIdService(this.props.match.params.id).then(userData => {
          const profile = userData.data.profile;
          const selectProfile = {
            ...profile,
            value: profile.id,
            label: profile.name
          };
          const subsidiary = userData.data.subsidiary;
          const selectSubsidiary =
            subsidiary !== null
              ? {
                  ...subsidiary,
                  value: subsidiary.id,
                  label: subsidiary.name
                }
              : null;
          const stateUser = userData.data;
          const selectUserState = {
            ...stateUser,
            value: stateUser.state,
            label: stateUser.state === 1 ? "Activo" : "Inactivo"
          };
          const user = {
            ...this.state.user,
            ...userData.data
          };
          this.setState({
            user: user,
            selectProfile: selectProfile,
            selectSubsidiary: selectSubsidiary,
            selectUserState: selectUserState
          });
        });
      });
  }

  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

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

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 0)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (
          this.compare(event.target.value, this.state.user[stateNameEqualTo])
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    if (stateName === "password") {
      if (event.target.value !== this.state.user.confirmPassword)
        this.setState({ confirmPasswordState: "error" });
      else this.setState({ confirmPasswordState: "success" });
    }

    const user = {
      ...this.state.user,
      [stateName]: event.target.value
    };

    this.setState({ user });
  }

  isValidated() {
    if (
      this.state.nameState === "success" &&
      this.state.emailState === "success" &&
      this.state.phoneState === "success" &&
      this.state.pointsState === "success" &&
      this.state.profileState === "success" &&
      this.state.subsidiaryState === "success" &&
      this.state.passwordState === "success" &&
      this.state.confirmPasswordState === "success"
    ) {
      return true;
    } else {
      if (this.state.nameState !== "success") {
        this.setState({ nameState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
      if (this.state.phoneState !== "success") {
        this.setState({ phoneState: "error" });
      }
      if (this.state.pointsState !== "success") {
        this.setState({ pointsState: "error" });
      }
      if (this.state.profileState !== "success") {
        this.setState({ profileState: "error" });
      }
      if (this.state.subsidiaryState !== "success") {
        this.setState({ subsidiaryState: "error" });
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

  handleChangeProfiles = profile => {
    this.setState({
      profileState: "success",
      selectProfile: profile
    });
  };

  handleChangeUserState = userState => {
    this.setState({
      stateUserState: "success",
      selectUserState: userState
    });
  };

  handleChangeSubsidiaries = subsidiary => {
    this.setState({
      subsidiaryState: "success",
      selectSubsidiary: subsidiary
    });
  };

  handleChangeImage = image => {
    this.setState({ image: image, imageState: "success" });
  };
  handleRemoveImage = () => {
    this.setState({ imageState: "error" });
  };

  handleSubmit() {
    if (this.isValidated()) {
      const {
        user,
        selectProfile,
        selectSubsidiary,
        selectUserState
      } = this.state;
      const dataUser = {
        id: this.props.match.params.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        points: user.points,
        state: selectUserState.value,
        password:
          user.password && user.password === user.confirmPassword
            ? user.password
            : null,
        profiles_id: selectProfile.value,
        subsidiary_id:
          selectSubsidiary !== null ? selectSubsidiary.value : null,
        image: this.state.image
      };
      updateUserService(dataUser).then(responseSaveUser => {
        if (responseSaveUser.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `User ${this.state.user.name} editado con éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/list-users`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseSaveUser.data.message,
            successMessage: null
          });
        }
      });
    } else {
      console.log("No has editado los campos requeridos!");
    }
  }

  render() {
    const { classes } = this.props;
    const { messageError, successMessage, user } = this.state;
    const options = [
      { label: "Activo", value: "1" },
      { label: "Inactivo", value: "0" }
    ];
    const avatar = user.image
      ? BUCKET_URL + decodeURIComponent(user.image + "")
      : defaultAvatar;

    console.log("avatar", avatar);

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
      <div>
        <GridContainer>
          {errorDiv}
          {successDiv}
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              {/* <CardAvatar profile>
                <img src={avatar} alt="Mi foto de perfil" />
              </CardAvatar> */}
              <CardBody profile>
                <h6 className={classes.cardCategory}>{user.profile.name}</h6>
                <h4 className={classes.cardTitle}>{user.name}</h4>
                <br />
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={1}>
                      <CustomInput
                        labelText="Id"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: user.id,
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        success={this.state.nameState === "success"}
                        error={this.state.nameState === "error"}
                        labelText="Nombre"
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "name", "length", 3),
                          value: user.name
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        labelText="Email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "email", "email"),
                          value: user.email
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="Documento"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:
                            user.identification_type +
                            ". " +
                            user.identification_number,
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        success={this.state.phoneState === "success"}
                        error={this.state.phoneState === "error"}
                        labelText="Teléfono"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "phone", "length", 5),
                          value: user.phone
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}>
                      <CustomInput
                        success={this.state.pointsState === "success"}
                        error={this.state.pointsState === "error"}
                        labelText="Puntos"
                        id="points"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "points", "number", 2),
                          value: user.points
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={2}>
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
                          autoComplete: "new-password",
                          type: "password",
                          onChange: event =>
                            this.change(event, "password", "password"),
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
                    <GridItem xs={12} sm={2}>
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
                            this.change(
                              event,
                              "confirmPassword",
                              "equalTo",
                              "password"
                            ),
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
                    <GridItem xs={12} sm={12} md={2}>
                      <Select
                        value={this.state.selectProfile}
                        onChange={selectedOption =>
                          this.handleChangeProfiles(selectedOption)
                        }
                        options={this.state.profiles}
                        placeholder={"Seleccione un perfil"}
                      />
                      <br />
                      {this.state.profileState === "error" ? (
                        <InputAdornment
                          position="end"
                          className={classes.danger}
                        >
                          Seleccione un perfil
                          <Close />
                        </InputAdornment>
                      ) : (
                        ""
                      )}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <Select
                        value={this.state.selectSubsidiary}
                        onChange={selectedOption =>
                          this.handleChangeSubsidiaries(selectedOption)
                        }
                        options={this.state.subsidiaries}
                        placeholder={"Seleccione un punto de venta"}
                      />
                      <br />
                      {this.state.subsiduaryState === "error" ? (
                        <InputAdornment
                          position="end"
                          className={classes.danger}
                        >
                          Seleccione un punto de venta
                          <Close />
                        </InputAdornment>
                      ) : (
                        ""
                      )}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <Select
                        value={this.state.selectUserState}
                        onChange={selectedOption =>
                          this.handleChangeUserState(selectedOption)
                        }
                        options={options}
                        placeholder={"Seleccione un Estado"}
                      />
                      <br />
                      {this.state.stateUserState === "error" ? (
                        <InputAdornment
                          position="end"
                          className={classes.danger}
                        >
                          Seleccione un estado
                          <Close />
                        </InputAdornment>
                      ) : (
                        ""
                      )}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="Fecha de registro"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: user.created_at,
                          disabled: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={3} md={3}>
                      <ImageUpload
                        imagePreview={`${avatar}`}
                        handleChangeImage={this.handleChangeImage}
                        handleRemoveImage={this.handleRemoveImage}
                        addButtonProps={{
                          color: "warning",
                          round: true
                        }}
                        changeButtonProps={{
                          color: "warning",
                          round: true
                        }}
                        removeButtonProps={{
                          color: "danger",
                          round: true
                        }}
                        uploadButtonText="Editar foto de perfil"
                        changeButtonText="Cambiar"
                        removeButtonText="Borrar"
                      />
                      {this.state.imageState === "error" ? (
                        <InputAdornment
                          position="end"
                          className={classes.danger}
                        >
                          Seleccione una nueva foto de perfil
                          <Close />
                        </InputAdornment>
                      ) : (
                        ""
                      )}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(userActions, dispatch)
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditUser);
