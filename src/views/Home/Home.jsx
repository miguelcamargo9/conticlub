import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

import Slides from "../../components/Slides/Slides.jsx";
import * as slideActions from "../../actions/slideActions";

class Home extends React.Component {
  componentDidMount() {
    this.props.SlideActions.getSlidesAction();
  }
  render() {
    return <Slides slides={this.props.slides} />;
  }
}

function mapStateToProps(state) {
  return {
    slides: state.slide.paths
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SlideActions: bindActionCreators(slideActions, dispatch)
  };
}

export default compose(
  withStyles(appStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
