import React from "react";
import PropTypes from "prop-types";

export default function Button({ wrapper: Wrapper, children, onClick, props }) {
  return (
    <Wrapper onClick={onClick} {...props}>
      {children}
    </Wrapper>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  wrapper: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object])
};

Button.defaultProps = {
  onClick: () => {},
  wrapper: function({ children }) {
    return children;
  }
};
