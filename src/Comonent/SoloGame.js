import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link,useHistory} from "react-router-dom";
import {POST_CONFIG,GET_CONFIG} from "./Constants";


const PlaySoloGame = (props) => {
    const gameId=props.match.params.gameId; 

    const [game,setGame] = useState();
    const history = useHistory();

    const routeChange = () =>{
        if(localStorage.getItem("token")==null){
            history.push("/login");
        }
        else{
            axios.post(`http://localhost:8762/game-session-handler/${game.id}/${game.tag}/${game.difficulty}`)
            .then((res)=>{history.push(`Play/${res.data}`)});
        }
        
    }
    
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
                    <p>*Image placeholder*</p>
                    <h3>{game.description}</h3>
                </div>
                <button style={playButtonContainerStyle} onClick={routeChange}>Play</button>               
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