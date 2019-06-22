import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import compose from "recompose/compose";

import * as authenticationActions from "../../actions/authenticationActions";
import { bindActionCreators } from "redux";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  onHandleLogin = event => {
    event.preventDefault();

    const username = event.target.firstname.value;
    const password = event.target.password.value;

    const data = {
      username,
      password
    };

    this.props.UserActions.loginUserAction(data);
  };

  render() {
    const { classes, error } = this.props;

    const errorDiv = error ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={error} color="danger" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.onHandleLogin}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="warning"
                >
                  <h4 className={classes.cardTitle}>Iniciar Sesión</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Usuario"
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Contraseña"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="warning" simple size="lg" block>
                    Enviar
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
        {errorDiv}
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  const { user } = state.login;
  if (user !== undefined) {
    if (user.hasOwnProperty("access_token")) {
      const token = user.access_token;
      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      props.history.push(`/admin/home`);
    }
  }
  return {
    error: state.error.message,
    user: state.login.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(authenticationActions, dispatch)
  };
}

export default compose(
  withStyles(loginPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);
