import React from "react";
import logo from "../img/logo.png";
// Styles
import { LogoDiv, BouncyImg } from "./Styles"; 

function Logo() {
  return (
    <LogoDiv>
      <BouncyImg className="App-logo" src={logo} alt="Happy Camping logo" />
    </LogoDiv>
  );
}

export default Logo;
