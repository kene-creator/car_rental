import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import tw from "twin.macro";
import "./App.css";
import Homepage from "./containers/Home";
import styled from "styled-components";
import PaymentPage from "./containers/Payment";
import Dashboard from "./containers/Dashboard";
import LoginPage from "./containers/Login_Registration/Login";
import RegistrationPage from "./containers/Login_Registration/Registration";

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
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
