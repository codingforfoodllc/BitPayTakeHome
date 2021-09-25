import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import styled from "styled-components";

const AppContent = styled.div`
  background: #a19e9e;
  height: 100vh;
`;

function App() {
  return (
    <AppContent>
      <Header></Header>
      <Main></Main>
    </AppContent>
  );
}

export default App;
