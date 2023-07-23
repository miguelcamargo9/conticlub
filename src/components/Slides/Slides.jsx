import React from "react";
import { Zoom } from "react-slideshow-image";

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true
};

class Slides extends React.Component {
  render() {
    return this.props.slides ? (
      <Zoom {...zoomOutProperties}>
        {this.props.slides.map((each, index) => (
          <img key={index} style={{ width: "100%" }} src={each} alt="Slide" />
        ))}
      </Zoom>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Slides;
