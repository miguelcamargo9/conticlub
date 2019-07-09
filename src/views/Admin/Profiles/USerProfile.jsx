import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { sessionService } from "redux-react-session";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import * as userActions from "../../../actions/userActions";
import { SERVER_URL } from "../../../constants/server";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import defaultAvatar from "assets/img/default-avatar.png";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class USerProfile extends React.Component {
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
        profile: { name: "" },
        subsidiary: { name: "", city: { name: "" } }
      }
    };
  }
  componentDidMount() {
    sessionService
      .loadUser()
      .then(user => {
        this.setState({ user });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    const avatar = user.image
      ? SERVER_URL + decodeURIComponent(user.image + "")
      : defaultAvatar;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardAvatar profile>
                <a href="#" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="Mi foto de perfil" />
                </a>
              </CardAvatar>
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
                        value: user.phone,
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
                        value: user.subsidiary.name,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Ciudad"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: user.subsidiary.city.name,
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
                        value: user.created_at,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
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
)(USerProfile);
