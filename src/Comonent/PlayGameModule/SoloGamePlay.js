import React, { useEffect, useState } from "react";
import axios from "axios";

const SoloGamePlay = (props) =>{

    const game=props.location.props.game;

    const [question,setQuestion] = useState();
    const [questionCouner,setQuestionCounter] = useState(0);

    //let round=1;

    useEffect(() => {
        axios.get(`http://localhost:8762/question-handler/${game.tag}/${game.difficulty}`)
        .then((res) => {
        setQuestion(res.data);      
    });
    },[]);


    console.log(game)
    console.log(question)

    return(
        question ? (
            <>
            <div>
                <h1>{game.title}</h1>
            </div>
            <div className="utilityContainer">
                <p>{questionCouner}/10</p>
            </div>
            <div className="questionContainer">
                <p style={question}>{question.question}</p>
            </div>
            <div className="answerContainer">
                <p style={answer}>{question.correctAnswer}</p>
                <p style={answer}>{question.wrongAnswer1}</p>
                <p style={answer}>{question.wrongAnswer2}</p>
                <p style={answer}>{question.wrongAnswer3}</p>
            </div>
        </>
        ) 
        : 
        (
            <h1>Loading question</h1>
        ) 

    )
}

const question ={
    textAlign:"center",
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
  

export default SoloGamePlay;

