import React from "react";
import PropTypes from "prop-types";

import * as S from "styles/burger";
import Image from "shared/Image";
import { getImage, BURGERS } from "constants/paths";
import Title from "shared/Title";
import List from "shared/List";

export default function Burger({ item, setRef, handed, onClick }) {
  const { id, name, ingredients, bun_type, meat_type, sauce_type } = item;

  const list = ingredients
    .map(item => item.info.name)
    .concat(bun_type.info.name, meat_type.info.name, sauce_type.info.name);

  return (
    <S.Wrapper ref={setRef} handed={handed}>
      <S.Burger onClick={onClick}>
        <S.ImageWrapper>
          <Image src={getImage(BURGERS, id)} />
        </S.ImageWrapper>
        <S.TitleWrapper>
          <Title text={name} size={2} unit={"rem"} />
        </S.TitleWrapper>
        <S.ListWrapper>
          <List items={list} />
        </S.ListWrapper>
      </S.Burger>
    </S.Wrapper>
  );
}

Burger.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    bun_type: PropTypes.object.isRequired,
    meat_type: PropTypes.object.isRequired,
    sauce_type: PropTypes.object.isRequired
  }).isRequired
};
