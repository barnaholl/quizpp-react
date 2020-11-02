import React, { useEffect, useState } from "react";
import axios from "axios";
import {POST_CONFIG,GET_CONFIG} from "./../Constants";

const SoloGamePlay = (props) =>{

    const NUMBER_OF_QUESTIONS=3;

    const sessionId=props.match.params.sessionId;

    const [question,setQuestion] = useState();
    const [questionCounter,setQuestionCounter] = useState(0);
    const [isActive,setIsActive]= useState(true);
    const [isGameWon,setIsGameWon]= useState(false);
    const [roundEnd,setRoundEnd]=useState("");
    const [timeLeft,setTimeLeft]=useState(30);


    useEffect(() => {
        axios.get(`http://localhost:8762/game-session-handler/${sessionId}`,GET_CONFIG)
            .then((res) => {
                setQuestionCounter(res.data.currentRound);
                setIsActive(res.data.isActive);
                setRoundEnd(res.data.roundEnd);
                console.log(res.data.roundEnd);
                 axios.get(`http://localhost:8762/question-handler/render/${res.data.currentQuestion}`,GET_CONFIG)
                    .then((res)=>{
                    setQuestion(res.data);  
                    }); 
            });
    },[]);

    useEffect(() => {
        
       const interval=setInterval(() => {
            const currentDate=new Date();
            const end=new Date(roundEnd);
            let result=(end.getTime()-currentDate.getTime())/1000;
            setTimeLeft(result);
            if(result<=0){
                setIsActive(false);
                axios.put(`http://localhost:8762/game-session-handler/setActive/${sessionId}/${false}`,"body",POST_CONFIG);         
            }
       }, 1000);

       return()=>clearInterval(interval);
    },[roundEnd]);

    const setGameActiviy = (isActive,isGameWon) =>{
        axios.put(`http://localhost:8762/game-session-handler/setActive/${sessionId}/${isActive}/${isGameWon}`,"body",POST_CONFIG);
        setIsActive(isActive);
        setIsGameWon(isGameWon);
    }

    const chooseAnswer= (answer) => {
    axios.put(`http://localhost:8762/game-session-handler/${sessionId}/${answer}`,"body",POST_CONFIG)
    .then((res)=>{
        if(res.data.currentRound>NUMBER_OF_QUESTIONS){
            setGameActiviy(false,true);
        }
        else{
            setGameActiviy(res.data.isActive,false);
            setQuestionCounter(res.data.currentRound);
            setRoundEnd(res.data.roundEnd);
            axios.get(`http://localhost:8762/question-handler/render/${res.data.currentQuestion}`,GET_CONFIG)
            .then((res)=>{setQuestion(res.data)})
        }        
    });
    
    }
    

    return(        
        question ? (
            isActive ? 
            (
            <>
                <div>
                    <h1>game title</h1>
                </div>
                <div style={utilityContainerStyle}>
                    <div>
                        <p>{questionCounter}/{NUMBER_OF_QUESTIONS}</p>
                    </div>
                    <div></div>
                    <div><p>Time:{timeLeft}</p></div>
                </div>
                <div className="questionContainer">
                    <p style={questionStyle}>{question.question}</p>
                </div>
                
                <div className="answerContainer">
                    <p onClick={()=>chooseAnswer(question.answer1)} style={answerStyle}>{question.answer1}</p>
                    <p onClick={()=>chooseAnswer(question.answer2)} style={answerStyle}>{question.answer2}</p>
                    <p onClick={()=>chooseAnswer(question.answer3)} style={answerStyle}>{question.answer3}</p>
                    <p onClick={()=>chooseAnswer(question.answer4)} style={answerStyle}>{question.answer4}</p>
                </div>
            </>
            ) 
            : 
            (
                isGameWon? 
                (
                    <p>Win</p>
                ) 
                : 
                (
                    <p>Lose</p>
                ) 
                
            ) 
            
        ) 
        : 
        (
            <h1>Loading question</h1>
        ) 

    )
}

const questionStyle = {
    textAlign:"center",
    fontSize:"2.5rem" 
  };

const answerStyle = {
    backgroundColor: "blue",
    borderRadius:"button-radius",
    padding:"normal",
    textAlign:"center",
    cursor:"pointer",
    color:"white",
    fontSize:"2rem" 
  };
  
  const utilityContainerStyle = {
    display: "grid",
    gap : "1rem",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gridTemplateColumns: "15% 1fr 15%",
    gridTemplateRows: "1fv",
  };

export default SoloGamePlay;

