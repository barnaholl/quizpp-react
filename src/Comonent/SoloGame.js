import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const PlaySoloGame = (props) => {
    let gameId=props.match.params.gameId; 

    //const game=props.location.props.game;

    //const gameTag=game.tag;
    //const gameDifficulty=game.difficulty;

    const [game,setGame] = useState();

    //const [question,setQuestion] = useState();
    //const [questionCouner,setQuestionCounter] = useState(0);

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
                <div>
                    <p>Image placeholder</p>
                    <h3>{game.description}</h3>
                </div>
                <Link style={playButtonContainerStyle} to={{pathname:`/SoloGamePlay/${gameId}`,props:{game:game}}} >Play</Link>

                
            </>
        ) 
        : 
        (
            <p>Loading...</p>
        )

        
    )
}
const playButtonContainerStyle = {
    backgroundColor: "green",
    cursor:PointerEvent,
    color:"white",
    fontSize:"2rem"
  };



export default PlaySoloGame;