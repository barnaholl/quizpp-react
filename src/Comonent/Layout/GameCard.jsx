import React, { useEffect, useState } from "react";
import {Link,useHistory} from "react-router-dom";
import axios from "axios";
import {GET_CONFIG} from "../Constants";

const GameCard = (props) => {

  const [footerColor,setFooterColor]=useState("blue");

  const cardStyle = {
    maxWidth: "30rem",
    minWidth:"20rem",
    height: "35rem",
    display: "grid",
    gridTemplateColumns: "1fv",
    gridTemplateRows: "15rem 16rem 4rem",
    borderRadius: "18px",
    background: "white",
    boxShadow:" 5px 5px 15px rgba(0,0,0,0.9)",
    fontFamily: "roboto",
    textAlign: "center",
    backgroundColor: "rgb(242, 242, 242)",
  
  };

  const gameEnrolled={
    display:"grid",
    gridTemplateColumns : "1fr",
    gridTemplateRows : "1fr",
    backgroundColor : `${footerColor}`,
    borderBottomLeftRadius:"15px",
    borderBottomRightRadius:"15px",
  };

  const TAG="Tag:";
  const DESCRIPTION="Description:";
  const ALREADY_ENROLLED="You have already played this game.";
  const NUMBER_OF_QUESTIONS=3;
  const game = props.game;
  const gameId=game.id;


  const [isSessionExist,setIsSessionExist]=useState();
  const [isSessionActive,setIsSessionActive]=useState(false);
  const [isGameWon,setIsGameWon]=useState(false);
  const [numberOfAnswers,setNumberOfAnswers]=useState(0);
  const [sessionId,setSessionId]=useState();
  const history = useHistory();


  useEffect(() => {
    axios.get("http://localhost:8762/jwtUtils/username",GET_CONFIG)
    .then(res=>{
        axios.get(`http://localhost:8762/user-handler/game-history/isGameSessionExistByGameIdAndUsername/${gameId}/${res.data}`,GET_CONFIG)
        .then((res2) => {
            setIsSessionExist(res2.data);
            res2.data ? 
            (
                axios.get(`http://localhost:8762/user-handler/game-history/getSoloGameSessionByGameIdAndUsername/${gameId}/${res.data}`,GET_CONFIG)
                .then((res3)=>{
                    setIsSessionActive(res3.data.isActive);
                    setSessionId(res3.data.id);
                    setIsGameWon(res3.data.isGameWon);
                    setNumberOfAnswers(res3.data.answeredQuestions.length);
                    res3.data.isGameWon ? setFooterColor("green") : setFooterColor("red");                   
                })
            ) 
            : 
            (
              setFooterColor("blue")
            )
        })
        
});
},[gameId]);

  const routeChange = () =>{
    history.push(`SoloGame/${gameId}`);
  }

  return (
    <div style={cardStyle} onClick={routeChange}>
      <div style={cardImage}></div>
      <div style={cardText}>
        <h1>{game.title}</h1>
        <h2>{TAG} {game.tag}</h2>
        <h2>{DESCRIPTION}</h2>
        <h3>{game.description}</h3>
      </div>

      <div style={gameEnrolled}>
      {isSessionExist ? 
                    (isSessionActive ? 
                        (
                            <p>In Progress</p>              
                        )
                        :
                        (
                          (isGameWon ?  <p>Success</p> : <p>Questions answered:{numberOfAnswers}/{NUMBER_OF_QUESTIONS}</p>)     
                        )
                    ) 
                    : 
                    (
                      <p>New game</p>           

                    )}
      </div>

      
    </div>
  );
  
};

const cardHeaderBackground="/images/card-header-test.jpg";



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
  gridTemplateRows : "1fv",
  justifyContent: "center",
  alignContent: "center",
  backgroundColor : "#2b2b2b",
  borderBottomLeftRadius:"15px",
  borderBottomRightRadius:"15px",
};


const playButtonContainerStyle = {
  fontFamily: "roboto",
  backgroundColor: "#2b2b2b",
  cursor:PointerEvent,
  color:"black",
  fontSize:"1.5rem",
  textDecoration: "none",
  textAlign:"center",
  verticalAlign: "text-bottom",
  height:"1fr",
  borderBottomLeftRadius:"15px",
  borderBottomRightRadius:"15px",
  justifyContent: "center",
  alignContent: "center",
  border:"none"

};

export default GameCard;