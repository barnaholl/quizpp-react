import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link,useHistory} from "react-router-dom";
import {POST_CONFIG,GET_CONFIG} from "./Constants";


const PlaySoloGame = (props) => {
    const gameId=props.match.params.gameId; 

    const [game,setGame] = useState();
    const history = useHistory();
    const [isSessionExist,setIsSessionExist]=useState();
    const [isSessionActive,setIsSessionActive]=useState(false);
    const [sessionId,setSessionId]=useState();

    const routeChange = () =>{
        if(localStorage.getItem("token")==null){
            history.push("/login");
        }
        if(isSessionActive){
            history.push(`Play/${sessionId}`);
        }
        else{
            axios.get("http://localhost:8762/jwtUtils/username",GET_CONFIG)
            .then(res=>{
                axios.post(`http://localhost:8762/game-session-handler/${game.id}/${res.data}/${game.tag}/${game.difficulty}`)
                .then((res)=>{history.push(`Play/${res.data}`)});
            })
        }
        
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8762/game-handler/${gameId}`)
        .then((res) => {
        setGame(res.data);      
    });
    },[gameId]);

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
                    })
                ) 
                : 
                (
                    console.log()  
                )
            })
            
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
                {isSessionExist ? 
                    (isSessionActive ? 
                        (
                            <button style={playButtonContainerStyle} onClick={routeChange}>Play</button>               
                        )
                        :
                        (
                            <p>*Score placeholder*</p>
                        )
                    ) 
                    : 
                    (
                        <button style={playButtonContainerStyle} onClick={routeChange}>Play</button>               

                    )}
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