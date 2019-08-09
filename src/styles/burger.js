import styled from "styled-components";
import SIZES from "constants/sizes";

export const Wrapper = styled.div`
  width: ${props => (props.handed ? "100%" : SIZES.SINGLE_COLUMN + "px")};
  padding: 4px;
`;

export const Burger = styled.div`
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;

  :hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 5px;
  object-fit: cover;
  overflow: hidden;
`;

export const TitleWrapper = styled.div`
  padding: 12px 16px 0;
  font-weight: bold;
  word-wrap: break-word;
`;

export const ListWrapper = styled.div`
  padding: 12px 20px;
  word-wrap: break-word;
`;
