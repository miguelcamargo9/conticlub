import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

import Slides from "../../components/Slides/Slides.jsx";
import WheelsList from "../Lists/Wheels/WheelsList";

import * as slideActions from "../../actions/slideActions";

class Home extends React.Component {
  componentDidMount() {
    this.props.SlideActions.getSlidesAction("down", 0);
    this.props.SlideActions.getSlidesAction("down", 1);
    this.props.SlideActions.getSlidesAction("up", 0);
    this.props.SlideActions.getSlidesAction("up", 1);
  }
  render() {
    return (
      <div>
        <GridContainer>
          <Hidden smDown>
            <GridItem xs={12} sm={12}>
              <Slides slides={this.props.slidesUp} />
            </GridItem>
          </Hidden>
          <Hidden mdUp implementation="css">
            <GridItem xs={12} sm={12}>
              <Slides slides={this.props.slidesUpResponsive} />
            </GridItem>
          </Hidden>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <WheelsList />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <Hidden smDown>
            <GridItem xs={12} sm={12}>
              <Slides slides={this.props.slidesDown} />
            </GridItem>
          </Hidden>
          <Hidden mdUp implementation="css">
            <GridItem xs={12} sm={12}>
              <Slides slides={this.props.slidesDownResponsive} />
            </GridItem>
          </Hidden>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    slidesUp: state.slide.pathsUp,
    slidesUpResponsive: state.slide.pathsUpResponsive,
    slidesDown: state.slide.pathsDown,
    slidesDownResponsive: state.slide.pathsDownResponsive
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
