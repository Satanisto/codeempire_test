import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const SImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function Image({ src }) {
  return <SImage src={src} />;
}

Image.propType = {
  src: PropTypes.string.isRequired
};
