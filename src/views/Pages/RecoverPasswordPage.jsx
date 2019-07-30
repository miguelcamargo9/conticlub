import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";

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

class RecoverPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      user: {
        username: "",
        email: ""
      }
    };
    this.onSubmit = this.onHandleRecoveryPass.bind(this);
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

  onHandleRecoveryPass = history => {
    const { user } = this.state;
    this.props.UserActions.recoveryPassAction(user, history);
  };

  render() {
    const {
      user: { username, email }
    } = this.state;
    const { classes, error, msg } = this.props;

    const errorDiv = error ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={error} color="danger" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    const msgDiv = msg ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={msg} color="info" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    const SubmitButton = withRouter(({ history }) => (
      <Button
        type="submit"
        onClick={() => this.onHandleRecoveryPass(history)}
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
                <h4 className={classes.cardTitle}>Recuperar Contraseña</h4>
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
                  labelText="Correo"
                  id="email"
                  onChange={this.onChange}
                  value={email}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "email",
                    value: email,
                    onChange: event => this.onChange(event),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
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
        {msgDiv}
      </div>
    );
  }
}

RecoverPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    error: state.error.message,
    msg: state.msg.message
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
)(RecoverPasswordPage);
