import React from "react";
import PropTypes from "prop-types";

import { Appear } from "shared/animations";

import { Error as SError, ErrorContent as SErrorContent } from "styles/preloader";
import Title from "shared/Title";

export default function Error({ in: inProp, error }) {
  return (
    <Appear in={inProp}>
      <SError>
        <Title text="Error" size={5} unit="rem" />
        <SErrorContent>{error}</SErrorContent>
      </SError>
    </Appear>
  );
}

Error.propTypes = {
  in: PropTypes.bool.isRequired,
  error: PropTypes.any
};
