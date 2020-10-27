import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {GET_CONFIG} from "./../Constants";

const GameCard = (props) => {

  const TAG="Tag:";
  const DESCRIPTION="Description:";
  const ALREADY_ENROLLED="You are already played this game.";
  const game = props.game;
  const gameId=game.id;
  const isPlayerEnrolledUrl=`http://localhost:8762/jwtUtils/isUserEnrolled/${gameId}`;


  const [isEnrolled,setIsEnrolled] = useState("false");


  useEffect(() => {
    axios.get(isPlayerEnrolledUrl,GET_CONFIG)
        .then((res) => {
      setIsEnrolled(res.data);
    });
  },[]);

  return (
    <div style={cardStyle}>
      <div style={cardImage}></div>
      <div style={cardText}>
        <h1>{game.title}</h1>
        <h2>{TAG} {game.tag}</h2>
        <h2>{DESCRIPTION}</h2>
        <h3>{game.description}</h3>
      </div>
        {isEnrolled ?
        (
          <div style={gameEnrolled}>
            <h3>{ALREADY_ENROLLED}</h3>
          </div>
        )
        :
      (    
        <div style={cardStats}>
          <div>
            <h3>Placeholder</h3>
          </div>
            <Link style={playButtonContainerStyle} to={{pathname:`/SoloGame/${gameId}`,props:{game:game}}} >Play</Link>

        </div>
      )
      }
      
    </div>
  );
};

const cardHeaderBackground="/images/card-header-test.jpg";


const cardStyle = {
  maxWidth: "30rem",
  minWidth:"20rem",
  height: "35rem",
  display: "grid",
  gridTemplateColumns: "1fv",
  gridTemplateRows: "15rem 17rem 3rem",
  borderRadius: "18px",
  background: "white",
  boxShadow:" 5px 5px 15px rgba(0,0,0,0.9)",
  fontFamily: "roboto",
  textAlign: "center",
  backgroundColor: "rgb(242, 242, 242)",

};
const cardImage={
  backgroundImage: `url(${cardHeaderBackground})`,
  borderTopLeftRadius:"15px",
  borderTopRightRadius:"15px",
  backgroundSize:"cover" 
};
const cardText={
  //gridArea: "text",
  //margin :"25px"
};
const cardStats={
  display:"grid",
  gridTemplateColumns : "2fr 1fr",
  gridTemplateRows : "1fr",
  backgroundColor : "#2b2b2b",
  borderBottomLeftRadius:"15px",
  borderBottomRightRadius:"15px",
};
const gameEnrolled={
  display:"grid",
  gridTemplateColumns : "1fr",
  gridTemplateRows : "1fr",
  backgroundColor : "#2b2b2b",
  borderBottomLeftRadius:"15px",
  borderBottomRightRadius:"15px",
};

const playButtonContainerStyle = {
  backgroundColor: "#2b2b2b",
  cursor:PointerEvent,
  color:"black",
  fontSize:"1.5rem",
  textDecoration: "none",
  backgroundSize:"cover",
  height:"3rem",
  borderBottomLeftRadius:"15px",
  borderBottomRightRadius:"15px",

};



export default GameCard;