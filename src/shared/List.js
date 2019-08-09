import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const SList = styled.ul``;

const SItem = styled.li`
  margin-left: 10px;
`;

export default function List({ items, getKey, component: Item, onClick }) {
  return (
    <SList>
      {items.map((item, index) => (
        <Item key={getKey(item, index)} item={item} onClick={() => onClick(item, index)}>
          {item}
        </Item>
      ))}
    </SList>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  getKey: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.object])
    .isRequired
};

List.defaultProps = {
  getKey: (_, index) => index,
  component: SItem,
  onClick: () => {}
};
