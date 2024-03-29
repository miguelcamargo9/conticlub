import React from "react";

import PropTypes from "prop-types";

import defaultImage from "assets/img/default-avatar.png";

class PictureUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: defaultImage
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.handleChangeImage(this.state.file);
    };
    reader.readAsDataURL(file);
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  render() {
    return (
      <div className="picture-container">
        <div className="picture">
          <img
            src={this.state.imagePreviewUrl}
            className="picture-src"
            alt="..."
          />
          <input type="file" onChange={e => this.handleImageChange(e)} />
        </div>
        <h6 className="description">{this.props.labelText}</h6>
      </div>
    );
  }
}

PictureUpload.defaultProps = {
  labelText: "Choose Picture"
};

PictureUpload.propTypes = {
  labelText: PropTypes.string
};

export default PictureUpload;
