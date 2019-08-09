import styled from "styled-components";
import COLORS from "constants/colors";

export const BurgerForm = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  position: fixed;
  z-index: 500;
  padding: 30px;
  overflow-y: auto;
`;

export const CloseWrapper = styled.div`
  font-size: 3rem;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  margin-top: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    min-width: 320px;
    padding: 15px;
  }
`;

export const Information = styled.div`
  margin-top: 20px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 7px;

  & > * {
    margin-left: 15px;
  }
`;

export const Price = styled.div`
  margin-top: 10px;
  color: ${COLORS.RED};
`;

export const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
`;

export const Button = styled.button`
  padding: 10px 15px;
  margin-right: 15px;
  background-color: ${COLORS.LIGHT_YELLOW};
  color: ${COLORS.RED};
  border: none;
  outline: none;
  cursor: pointer;

  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-bottom: ${props => (props.squeeze ? "-80px" : "-40px")};
  }
`;

export const BurgerItem = styled.div`
  max-width: 320px;
  opacity: ${props => (props.state ? "0.5" : "1")};
  z-index: ${props => props.z_index + 600};
  height: ${props => (props.delete ? "0px" : "100px")};
  position: relative;
  ${props => (props.delete ? "margin-bottom: 0;" : "")}
  transition: margin 0.5s, height 0.5s;
`;
