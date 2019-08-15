import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const STitle = styled.div`
  font-size: ${props => `${props.size}${props.unit}`};
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function Title({ text, size, unit }) {
  return (
    <STitle size={size} unit={unit}>
      {text}
    </STitle>
  );
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  unit: PropTypes.oneOf(["rem", "px"])
};
