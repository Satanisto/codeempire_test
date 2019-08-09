import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    transition: transform .5s, opacity .5s, box-shadow .5s;
  }

  body {
    font-family: sans-serif;
    font-size: 14px;
  }
`;

export const App = styled.div`
  padding: 15px 10px;
`;

export const BurgersWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
