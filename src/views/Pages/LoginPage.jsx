import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";

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

import * as authenticationActions from "../../actions/authenticationActions";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import logo from "assets/img/logo_1.png";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      user: {
        username: "",
        password: ""
      }
    };
    this.onSubmit = this.onHandleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange(e) {
    const { value, name } = e.target;

    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  onHandleLogin = history => {
    const { user } = this.state;
    this.props.UserActions.loginUserAction(user, history);
  };

  render() {
    const {
      user: { username, password }
    } = this.state;
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

    const SubmitButton = withRouter(({ history }) => (
      <Button
        type="submit"
        onClick={() => this.onHandleLogin(history)}
        color="warning"
        simple
        size="lg"
        block
      >
        Enviar
      </Button>
    ));

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <img src={logo} alt="logo" className={classes.img} />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card login className={classes[this.state.cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="warning"
              >
                <h4 className={classes.cardTitle}>Iniciar Sesión</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Ingrese Su Cédula"
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "username",
                    value: username,
                    onChange: event => this.onChange(event),
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
                  onChange={this.onChange}
                  value={password}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "password",
                    value: password,
                    type: "password",
                    onChange: event => this.onChange(event),
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
                <SubmitButton />
              </CardFooter>
            </Card>
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
  return {
    error: state.error.message
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
