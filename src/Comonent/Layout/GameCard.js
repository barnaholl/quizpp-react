import React, { useEffect, useState } from "react";

const GameCard = (props) => {
  const game = props.game;

  return (
    <div style={cardStyle}>
      <h1>{game.title}</h1>
      <p>{game.id}</p>
    </div>
  );
};

const cardStyle = {
  width: "40rem",
  minHeight: "20rem",
  height: "20rem",
  backgroundColor: "dimgrey",
  border: "1px solid darkgoldenrod",
  borderRadius: "3px",
  textAlign: "justify",
  boxShadow:
    "  0 2.8px 2.2px rgba(105,105,105, 0.034),\n" +
    "  0 6.7px 5.3px rgba(105,105,105, 0.048),\n" +
    "  0 12.5px 10px rgba(105,105,105, 0.06),\n" +
    "  0 22.3px 17.9px rgba(105,105,105, 0.072)",
};

export default GameCard;