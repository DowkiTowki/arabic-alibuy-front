import React, { Component } from "react";

class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    // initially set loading to true and current src of image to placeholder image
    this.state = {
      loading: true,
      currentSrc: props.placeholder,
    };
  }

  componentDidMount() {
    const { src } = this.props;
    // start loading original image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () =>
      // When image is loaded replace the image's src and set loading to false
      this.setState({ currentSrc: src, loading: false });
  }

  render() {
    const { currentSrc, loading } = this.state;
    const { alt, className, aspectRatio } = this.props;
    return (
      <img
        src={currentSrc}
        className={`${loading && "pt-2 rounded-b-2xl"} ${className}`}
        style={{
          aspectRatio: aspectRatio,
          //     opacity: loading ? 0.5 : 1,
          transition: "opacity 0.5s linear",
        }}
        alt={alt}
      />
    );
  }
}

export default ProgressiveImage;
