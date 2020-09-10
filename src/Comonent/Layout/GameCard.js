import React, { useEffect, useState } from "react";

const GameCard = (props) => {
  const game = props.game;

  return (
    <div style={cardStyle}>
      <h1>{game.title}</h1>
      <p>{game.tag}</p>
    </div>
  );
};

const cardStyle = {
  maxWidth: "1fr",
  minWidth:"20rem",
  height: "20rem",
  backgroundColor: "dimgrey",
  border: "1px solid darkgoldenrod",
  borderRadius: "3px",
  textAlign: "justify",
  
};

export default GameCard;