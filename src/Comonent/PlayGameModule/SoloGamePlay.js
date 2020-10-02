import React, { useEffect, useState } from "react";
import axios from "axios";

const SoloGamePlay = (props) =>{

    const sessionId=props.match.params.sessionId;

    const [question,setQuestion] = useState();
    const [questionCounter,setQuestionCounter] = useState(0);
    const [isActive,setIsActive]= useState(true);


    useEffect(() => {
        axios.get(`http://localhost:8762/game-session-handler/${sessionId}`)
        .then((res) => {
        setQuestionCounter(res.data.currentRound);
        setIsActive(res.data.isActive);
        axios.get(`http://localhost:8762/question-handler/${res.data.currentQuestion}`)
        .then((res)=>{
        setQuestion(res.data)});
            
    });
    },[]);

    const answeredWell = () => {
        axios.put(`http://localhost:8762/game-session-handler/${sessionId}/${true}`)
        .then((res)=>{
            setIsActive(res.data.isActive)
            setQuestionCounter(res.data.currentRound)
            axios.get(`http://localhost:8762/question-handler/${res.data.currentQuestion}`)
            .then((res)=>{setQuestion(res.data)})
        });
      }
      const answeredWrong = () => {
        axios.put(`http://localhost:8762/game-session-handler/${sessionId}/${false}`)
        .then((res)=>{
            setIsActive(res.data.isActive)
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
                <div className="utilityContainer">
                    <p>{questionCounter}/10</p>
                </div>
                <div className="questionContainer">
                    <p style={questionStyle}>{question.question}</p>
                </div>
                <div className="answerContainer">
                    <p onClick={answeredWell} style={answerStyle}>{question.correctAnswer}</p>
                    <p onClick={answeredWrong} style={answerStyle}>{question.wrongAnswer1}</p>
                    <p onClick={answeredWrong} style={answerStyle}>{question.wrongAnswer2}</p>
                    <p onClick={answeredWrong} style={answerStyle}>{question.wrongAnswer3}</p>
                </div>
            </>
            ) 
            : 
            (
                <p>Lose</p>
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
  

export default SoloGamePlay;

