import styled, { keyframes } from "styled-components";
import { bounceIn, bounceInDown } from "react-animations";

// Animation elements
const bounceAnimation = keyframes`${bounceIn}`;
const bounceInDownAnimation = keyframes`${bounceInDown}`;

export const BouncyImg = styled.img`
  animation: 1s ${bounceAnimation};
`;

// DIV elements
export const LogoDiv = styled.div`
  margin: 1em 0;
`;

export const InputWrapper = styled.div`
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  
  h2 {
    color: white;
    margin-bottom: 2rem;
  }

  input {
    background: #000058;
    border-style: none;
    border-bottom: 2px solid #c5c5c5;
    text-align: left;
    color: white;
    width: 100%;
    height: 2em;
    font-size: 1.3em;
    outline: none;
    margin-bottom: 0.5em;
    font-family: Menlo, Monaco, monospace;
  }

  input::placeholder{
    color: #c5c5c5;
  }

  button {
    background: #ff0040;
    color: white;
    cursor: pointer;
    padding: 0.4em 1em;
    border-style: none;
    border-radius: 3px;
    font-size: 1.3em;
    outline: none;
    transition: 0.4s;
    margin-top: 1em;
    font-family: Menlo, Monaco, monospace;
  }

  button:hover {
    background: #8cffd7;
  }
  
`;

export const WeatherWrapper = styled.div`
  margin-bottom: 4em;

  svg {
    max-width: 38em;
    display: block;
    margin: auto;
    animation: 3s ${bounceInDownAnimation};
  }

  path {
    fill: white;
    stroke: black;
    stroke-width: 2;
    stroke-linejoin: round;
    text-align: center;
    margin: auto;
  }

  path:hover {
    fill: aliceblue;
    stroke: lightskyblue;
  }

  text {
    font-size: 0.25em;
  }

  h2 {
    margin-top: 1em;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    color: white;
  }

  img {
    width: 5em;
    height: 5em;
    position: relative;
    top: 2em;
    background: white;
    border-radius: 50%;
    margin-left: 1em;
    border: 0.2em solid lightskyblue;
  }

  p {
    color: red;
  }
`;

export const TempToggle = styled.button`

label {
  float:left;
  width: 8em;
  background-color: #000058;
  color: #c5c5c5;
  border-radius: 0.3em;
  display: block;
  position: relative;
  overflow: hidden;
  font-size: 1.3em;
  font-family: Menlo, Monaco, monospace;
}

span {
  text-align:center;
  padding: 14px 28px;
  display: block;
}

input {
  position:absolute;
  visibility: hidden;
}

input:checked + span {
  background-color: #ff0040;
  color:#F7F7F7;
}

.celsius {
  border-right: 2px solid #c5c5c5;
}
`;

export const CampsiteDiv = styled.div`
 color: white;
 margin-top: 4em;
 margin-bottom: 8em;

 h3 {
   margin-bottom: 1em;
 }

 input {
   margin-bottom: 1.5em;
   width: 3em;
   text-align: center;
 }

 ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: #ff0040;
}

`;
