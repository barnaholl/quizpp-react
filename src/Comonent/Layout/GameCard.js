import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {GET_CONFIG} from "./../Constants";

const GameCard = (props) => {
  const TAG="Tag:";
  const DESCRIPTION="Description:";
  const ALREADY_ENROLLED="You are already enrolled this game";
  const game = props.game;
  const gameId=game.id;
  const isPlayerEnrolledUrl=`http://localhost:8762/jwtUtils/isUserEnrolled/${gameId}`;

  const [isEnrolled,setIsEnrolled] = useState("false");


  useEffect(() => {
    axios.get(isPlayerEnrolledUrl,GET_CONFIG)
        .then((res) => {
      console.log(res.data);
      setIsEnrolled(res.data);
    });
  },[]);

  return (
    <div style={cardStyle}>
      <h1>{game.title}</h1>
      <h2>{TAG} {game.tag}</h2>
      <h2>{DESCRIPTION}</h2>
      <h3>{game.description}</h3>
      {isEnrolled ?
      (
        <h3>{ALREADY_ENROLLED}</h3>

      )
      :
      (
        <Link style={playButtonContainerStyle} to={{pathname:`/SoloGame/${gameId}`,props:{game:game}}} >Play</Link>
      )
      }
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