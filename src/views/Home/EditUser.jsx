import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { sessionService } from "redux-react-session";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Help from "@material-ui/icons/Help";

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

import * as userActions from "../../actions/userActions";
import {
  updateUserService,
  getUserByIdService
} from "../../services/userService";
import { SERVER_URL } from "../../constants/server";

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
      user: {
        id: "",
        name: "",
        email: "",
        phone: "",
        points: "",
        state: "",
        created_at: "",
        profile: { id: "", name: "" },
        subsidiary: { id: "", name: "" }
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let sessionUser = "";
    sessionService
      .loadUser()
      .then(user => {
        sessionUser = user;
      })
      .then(() => {
        getUserByIdService(sessionUser.id).then(userData => {
          const user = {
            ...this.state.user,
            ...userData.data
          };
          this.setState({
            user: user
          });
        });
      })
      .catch(err => console.log(err));
  }

  handleChangeImage = image => {
    this.setState({ image: image, imageState: "success" });
  };
  handleRemoveImage = () => {
    this.setState({ imageState: "error" });
  };

  handleSubmit() {
    if (this.state.imageState === "success") {
      const { user } = this.state;
      const dataUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        points: user.points,
        state: user.state,
        profiles_id: user.profile.id,
        subsidiary_id: user.subsidiary.id,
        image: this.state.image
      };
      updateUserService(dataUser).then(responseSaveUser => {
        if (responseSaveUser.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `User ${
              this.state.user.name
            } editado con éxito, recuerde que una vez actualizada la foto de perfil, 
            el cambio se verá reflejado la próxima vez que inicie sesión`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/profile-user`);
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

    const avatar = user.image
      ? SERVER_URL + decodeURIComponent(user.image + "")
      : defaultAvatar;
    return (
      <div>
        <GridContainer>
          {errorDiv}
          {successDiv}
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{user.profile.name}</h6>
                <h4 className={classes.cardTitle}>{user.name}</h4>
                <br />
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
                      labelText="Nombre"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: user.name,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: user.email,
                        disabled: true
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
                      labelText="Teléfono"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: user.phone !== null ? user.phone : null,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={1}>
                    <CustomInput
                      labelText="Puntos"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: user.points,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Perfil"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: user.profile.name,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Punto de venta"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:
                          user.subsidiary !== null
                            ? user.subsidiary.name
                            : "N/A",
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={1}>
                    <CustomInput
                      labelText="Estado"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: user.state === 1 ? "Activo" : "Inactivo",
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Fecha de registro"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:
                          user.created_at !== null ? user.created_at : "N/A",
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <form>
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
              <GridContainer justify="center">
                <GridItem xs={12} sm={3} md={3}>
                  <CardFooter className={classes.justifyContentCenter}>
                    <Button
                      color="warning"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      Guardar
                    </Button>
                  </CardFooter>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          {errorDiv}
          {successDiv}
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent
              message={
                "Si necesitas actualizar tu información por favor contáctanos en la linea CAU 3013211294."
              }
              icon={Help}
              color="info"
            />
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
