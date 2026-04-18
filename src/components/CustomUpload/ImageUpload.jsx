import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.jsx";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
const pdfIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23e53935' d='M320 464H64c-17.7 0-32-14.3-32-32V80c0-17.7 14.3-32 32-32h160l128 128v288c0 17.7-14.3 32-32 32z'/%3E%3Cpath fill='%23ef9a9a' d='M224 48l128 128H256c-17.7 0-32-14.3-32-32V48z'/%3E%3Ctext x='192' y='340' text-anchor='middle' fill='white' font-size='120' font-family='Arial' font-weight='bold'%3EPDF%3C/text%3E%3C/svg%3E";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    const defaultImageLoad =
      this.props.imagePreview !== "" ? this.props.imagePreview : defaultImage;
    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImageLoad,
      isPdf: false
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.imagePreview !== this.props.imagePreview) {
      const defaultImageLoad =
        this.props.imagePreview !== "" ? this.props.imagePreview : defaultImage;
      this.setState({
        imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImageLoad
      });
    }
  }
  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (isPdf) {
      this.setState({
        file: file,
        imagePreviewUrl: pdfIcon,
        isPdf: true
      });
      this.props.handleChangeImage(file);
    } else {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          isPdf: false
        });
        this.props.handleChangeImage(file);
      };
      reader.readAsDataURL(file);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
      isPdf: false
    });
    this.refs.fileInput.value = null;
    this.props.handleRemoveImage();
  }
  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps,
      uploadButtonText,
      changeButtonText,
      removeButtonText
    } = this.props;
    return (
      <div className="fileinput text-center">
        <input type="file" accept="image/jpeg,image/png,image/gif,application/pdf" onChange={this.handleImageChange} ref="fileInput" />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img
            src={this.state.imagePreviewUrl}
            alt="..."
            style={this.state.isPdf ? { width: "60%", height: "auto", padding: "25px 20%" } : {}}
          />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Add Photo" : uploadButtonText}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                {changeButtonText}
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
              >
                <i className="fas fa-times" /> {removeButtonText}
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.defaultProps = {
  uploadButtonText: "Select Image",
  changeButtonText: "Change",
  removeButtonText: "Remove",
  imagePreview: ""
};

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
  uploadButtonText: PropTypes.string,
  changeButtonText: PropTypes.string,
  removeButtonText: PropTypes.string,
  imagePreview: PropTypes.string
};

export default ImageUpload;
