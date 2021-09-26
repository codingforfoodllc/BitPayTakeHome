import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import styled from "styled-components";
import { ReactSVG } from "react-svg";

const AppContent = styled.div`
  background: #eef1f7;
  height: 100vh;
`;

function App() {
  return (
    <AppContent>
      {/* <div style={{ position: "absolute" }}>
        <ReactSVG src="wave.svg" style={{ zIndex: -100 }} />
      </div> */}
      <Header></Header>
      <Main></Main>
    </AppContent>
  );
}

export default App;
