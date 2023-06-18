import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import tw from "twin.macro";
import "./App.css";
import Homepage from "./containers/Home";
import styled from "styled-components";
import PaymentPage from "./containers/Payment";

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
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/payment/:carId" element={<PaymentPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
