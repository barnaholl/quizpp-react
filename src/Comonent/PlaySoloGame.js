import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaySoloGame = (props) => {
    let gameId=props.match.params.gameId; 

    const game=props.location.props.game;

    const gameTag=game.tag;
    const gameDifficulty=game.difficulty;
    //http://localhost:8762/question-handler/${gameTag}/${gameDifficulty}

    useEffect(() => {
        axios.get(`http://localhost:8762/question-handler/${gameTag}/${gameDifficulty}`)
        .then((res) => {
        console.log(res.data);
        
    });
    },[gameId]);

      
    return(<p>{gameDifficulty}{gameTag}</p>)
}

export default PlaySoloGame;