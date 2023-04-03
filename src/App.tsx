import React from "react";
import tw from "twin.macro";
import "./App.css";
import Homepage from "./containers/Home";
import styled from "styled-components";

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

function App() {
  return (
    <AppContainer>
      <Homepage />
    </AppContainer>
  );
}

export default App;
