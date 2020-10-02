import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link,useHistory} from "react-router-dom";



const PlaySoloGame = (props) => {
    let gameId=props.match.params.gameId; 

    const [game,setGame] = useState();

    const history = useHistory();

    const routeChange = () =>{
      axios.post(`http://localhost:8762/game-session-handler/${game.id}/${game.tag}/${game.difficulty}`)
      .then((res)=>{history.push(`Play/${res.data}`)});
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
                    <p>Image placeholder</p>
                    <h3>{game.description}</h3>
                </div>
                <Link style={playButtonContainerStyle} to={{pathname:`/SoloGamePlay/${gameId}`,props:{game:game}}} >Play</Link>
                <button onClick={routeChange}>Play</button>               
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