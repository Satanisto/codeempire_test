import React from "react";
import PropTypes from "prop-types";

export default function Button({ children, onClick }) {
  return React.cloneElement(children, {
    onClick
  });
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired
};

Button.defaultType = {
  onClick: () => {}
};
