import React, { Component } from "react";
import PropTypes from "prop-types";

export class ResizeHelper extends Component {
  static propTypes = {
    onResize: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.onResize) {
      window.addEventListener("resize", this.handleResize);
    }
  }

  componentWillUnmount() {
    if (this.props.onResize) {
      window.removeEventListener("resize", this.handleResize);
    }
  }

  handleResize = event => {
    if (!this.resizeTimer) {
      this.props.onResize(event);
      this.resizeTimer = setTimeout(() => {
        this.resizeTimer = false;
      }, 250);
    }
  };

  render() {
    return <></>;
  }
}

export default ResizeHelper;
