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
    this.props.slideActions.getSlidesAction("down", 0);
    this.props.slideActions.getSlidesAction("down", 1);
    this.props.slideActions.getSlidesAction("up", 0);
    this.props.slideActions.getSlidesAction("up", 1);
  }
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <Hidden smDown>
              <Slides slides={this.props.slidesUp} />
            </Hidden>
            <Hidden mdUp implementation="css">
              <Slides slides={this.props.slidesUpResponsive} />
            </Hidden>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <WheelsList />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <Hidden smDown>
              <Slides slides={this.props.slidesDown} />
            </Hidden>
            <Hidden mdUp implementation="css">
              <Slides slides={this.props.slidesDownResponsive} />
            </Hidden>
          </GridItem>
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
    slideActions: bindActionCreators(slideActions, dispatch)
  };
}

export default compose(
  withStyles(appStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
