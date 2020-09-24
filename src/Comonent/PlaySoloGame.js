import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaySoloGame = (props) => {
    let gameId=props.match.params.gameId; 

    //const game=props.location.props.game;

    //const gameTag=game.tag;
    //const gameDifficulty=game.difficulty;

    const [game,setGame] = useState();

    const [question,setQuestion] = useState();
    const [questionCouner,setQuestionCounter] = useState(0);

    // useEffect(() => {
    //     axios.get(`http://localhost:8762/question-handler/${gameTag}/${gameDifficulty}`)
    //     .then((res) => {
    //     setQuestion(res.data);      
    // });
    // },[gameId]);
    
    useEffect(() => {
        axios.get(`http://localhost:8762/game-handler/${gameId}`)
        .then((res) => {
        setGame(res.data);      
    });
    },[gameId]);

        
    return(
        game ?  (
            <>
                <h1>{game.title}</h1>
                <div className="utilityContainer">
                <p>{questionCouner}/10</p>
                </div>
                <div className="questionContainer">
                    <p style={question}>question.title</p>
                </div>
                <div className="answerContainer">
                    <p style={answer}>answer1</p>
                    <p style={answer}>answer2</p>
                    <p style={answer}>answer3</p>
                    <p style={answer}>answer4</p>
                </div>
            </>
        ) 
        : 
        (
            <p>Loading...</p>
        )

        
    )
}

const question ={
    fontSize:"2.5rem" 
}

const answer = {
    backgroundColor: "blue",
    borderRadius:"button-radius",
    padding:"normal",
    textAlign:"center",
    cursor:"pointer",
    color:"white",
    fontSize:"2rem" 
  };
  

export default PlaySoloGame;