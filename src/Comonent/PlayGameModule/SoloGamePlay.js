import React, { useEffect, useState } from "react";
import axios from "axios";

const SoloGamePlay = (props) =>{

    const sessionId=props.match.params.sessionId;

    const [question,setQuestion] = useState();
    const [questionCouner,setQuestionCounter] = useState(0);


    useEffect(() => {
        axios.get(`http://localhost:8762/game-session-handler/${sessionId}`)
        .then((res) => {
        axios.get(`http://localhost:8762/question-handler/${res.data.tag}/${res.data.difficulty}`)
        .then((res)=>{setQuestion(res.data)});
            
    });
    },[]);

    return(
        question ? (
            <>
            <div>
                <h1>game title</h1>
            </div>
            <div className="utilityContainer">
                <p>{questionCouner}/10</p>
            </div>
            <div className="questionContainer">
                <p style={questionStyle}>{question.question}</p>
            </div>
            <div className="answerContainer">
                <p style={answerStyle}>{question.correctAnswer}</p>
                <p style={answerStyle}>{question.wrongAnswer1}</p>
                <p style={answerStyle}>{question.wrongAnswer2}</p>
                <p style={answerStyle}>{question.wrongAnswer3}</p>
            </div>
        </>
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

