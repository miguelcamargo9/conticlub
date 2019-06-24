import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

import Slides from "../../components/Slides/Slides.jsx";
import WheelsList from "../Lists/Wheels/WheelsList";
import * as slideActions from "../../actions/slideActions";

class Home extends React.Component {
  componentDidMount() {
    this.props.SlideActions.getSlidesAction();
  }
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <Slides slides={this.props.slides} />
          </GridItem>
        </GridContainer>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <WheelsList />
          </GridItem>
        </GridContainer>
      </div>
    );
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
