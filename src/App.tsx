import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import styled from "styled-components";

const AppContent = styled.div`
  background: #eef1f7;
  height: 100%;
  position: relative;
  min-height: 100vh;
`;

function App() {
  return (
    <AppContent>
      <div style={{ position: "absolute", width: "100%" }}>
        <div
          // background: "linear-gradient(#524FF4, #6139F8)",
          style={{
            background: "linear-gradient(#605df7, #6139F8)",
            width: "100%",
            height: "20vh",
          }}
        ></div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#6139F8"
            fill-opacity="1"
            d="M0,288L80,293.3C160,299,320,309,480,288C640,267,800,213,960,213.3C1120,213,1280,267,1360,293.3L1440,320L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <Header></Header>
      <Main></Main>
    </AppContent>
  );
}

export default App;
