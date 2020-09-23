import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const GameCard = (props) => {
  const TAG="Tag:";
  const DESCRIPTION="Description:";
  const game = props.game;

  return (
    <div style={cardStyle}>
      <h1>{game.title}</h1>
      <h2>{TAG} {game.tag}</h2>
      <h2>{DESCRIPTION}</h2>
      <h3>{game.description}</h3>
      <Link style={playButtonContainerStyle} to="/PlaySoloGame">Play</Link>
      

    </div>
  );
};

const cardStyle = {
  maxWidth: "30rem",
  minWidth:"20rem",
  height: "25rem",
  backgroundColor: "dimgrey",
  border: "1px solid darkgoldenrod",
  borderRadius: "3px",
  textAlign: "justify", 
};
const playButtonContainerStyle = {
  backgroundColor: "green",
  cursor:PointerEvent,
  color:"white",
  fontSize:"2rem"
};




export default GameCard;