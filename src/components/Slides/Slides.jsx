import React from "react";
import Slideshow from "react-slidez";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class Slides extends React.Component {
  render() {
    return this.props.slides ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={11}>
          <Slideshow
            showArrows
            autoplay
            enableKeyboard
            useDotIndex={false}
            slideInterval={5000}
            defaultIndex={1}
            slides={this.props.slides}
            effect={"bounce-left"}
            height={"50%"}
            width={"90%"}
          />
        </GridItem>
      </GridContainer>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Slides;
