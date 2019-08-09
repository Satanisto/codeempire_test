import styled, { keyframes } from "styled-components";
import COLORS from "constants/colors";

export const Preloader = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${COLORS.LIGHT_YELLOW};
  color: ${COLORS.RED};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  position: fixed;
  padding: 30px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: rotate(360deg) scale(1.1);
    opacity: 1;
  }
  to {
    transform: rotate(360deg) scale(1);
    opacity: 0.5;
  }
`;

export const Animator = styled.div`
  animation: ${rotate} 3s ease infinite;
`;

export const Error = styled(Preloader)`
  background-color: ${COLORS.RED};
  color: #ffffff;
  font-size: 1rem;
  display: block;
`;

export const ErrorContent = styled.div`
  margin-top: 50px;
`;
