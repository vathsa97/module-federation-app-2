import React from "react";
// import "./index.css";
import styled from "styled-components";

const Wrapper = styled("div")`
  margin: 10px;
  padding: 10px;
  text-align: center;
  background-color: cyan;
`;

const App = () => {
  return (
    <Wrapper>
      <h1>App 2</h1>
    </Wrapper>
  );
};

export default App;
