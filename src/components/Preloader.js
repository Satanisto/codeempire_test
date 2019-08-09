import React from "react";
import PropTypes from "prop-types";

import * as S from "styles/preloader";

import { FaHamburger } from "shared/icons";
import { Appear } from "shared/animations";

export default function Preloader({ in: inProp }) {
  return (
    <Appear in={inProp}>
      <S.Preloader>
        <S.Animator>
          <FaHamburger />
        </S.Animator>
      </S.Preloader>
    </Appear>
  );
}

Preloader.propTypes = {
  in: PropTypes.bool.isRequired
};
