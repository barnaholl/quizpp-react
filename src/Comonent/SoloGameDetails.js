import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link,useHistory} from "react-router-dom";
import {POST_CONFIG,GET_CONFIG} from "./Constants";


const SoloGameDetails = (props) => {

    const NUMBER_OF_QUESTIONS=3;

    const gameId=props.match.params.gameId; 

    const [game,setGame] = useState();
    const history = useHistory();
    const [isSessionExist,setIsSessionExist]=useState();
    const [isSessionActive,setIsSessionActive]=useState(false);
    const [sessionId,setSessionId]=useState();
    const [answerQuestions,setAnsweredQuestions]=useState();


    const routeChange = () =>{
        if(localStorage.getItem("token")==null){
            history.push("/login");
        }
        else if(isSessionActive){
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
                        setAnsweredQuestions(res3.data.answeredQuestions.length);
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
            <div style={soloGameDetailsStyle}>
                <div>
                    <h1>{game.title}</h1>
                </div>
                <div>
                    <p>*Image placeholder*</p>
                    <p>Description:{game.description}</p>
                    <p>Difficulty:{game.difficulty}</p>
                    <p>Tag:{game.tag}</p>
                    <p>Type:{game.type}</p>
                </div>
                {isSessionExist ? 
                    (isSessionActive ? 
                        (
                            <button style={playButtonContainerStyle} onClick={routeChange}>Play</button>               
                        )
                        :
                        (
                            <h1>Answers:{answerQuestions}/{NUMBER_OF_QUESTIONS}</h1>  
                        )
                    ) 
                    : 
                    (
                        <button style={playButtonContainerStyle} onClick={routeChange}>Play</button>               

                    )}
            </div>
        ) 
        : 
        (
            <p>Loading...</p>
        )        
    )
}
const soloGameDetailsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "15rem 16rem 5rem",
    borderRadius: "18px",
    background: "white",
    fontFamily: "roboto",
    textAlign: "center",
  };

const playButtonContainerStyle = {
    maxWidth: "10rem",
    minWidth:"1fr",
    backgroundColor: "green",
    cursor:PointerEvent,
    color:"white",
    fontSize:"2rem"
  };


export default SoloGameDetails;