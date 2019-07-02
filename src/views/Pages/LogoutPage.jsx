import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as authenticationActions from "../../actions/authenticationActions";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LogoutPage extends React.Component {
  componentDidMount() {
    this.props.UserActions.logoutUserAction(this.props.history);
  }

  render() {
    return <div />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(authenticationActions, dispatch)
  };
}

export default compose(
  withStyles(loginPageStyle),
  connect(
    null,
    mapDispatchToProps
  )
)(LogoutPage);
