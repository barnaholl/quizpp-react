import React, { useEffect, useState } from "react";
import axios from "axios";


const SoloGamePlay = (props) =>{


    const NUMBER_OF_QUESTIONS=3;

    const sessionId=props.match.params.sessionId;

    const [question,setQuestion] = useState();
    const [questionCounter,setQuestionCounter] = useState(0);
    const [isVictory,setIsVictory]=useState(false);
    const [isActive,setIsActive]= useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8762/game-session-handler/${sessionId}`)
            .then((res) => {
                setQuestionCounter(res.data.currentRound);
                setIsActive(res.data.isActive);
                 axios.get(`http://localhost:8762/question-handler/render/${res.data.currentQuestion}`)
                    .then((res)=>{
                    setQuestion(res.data);  
                    });    
            });
    },[]);

    const chooseAnswer= (answer) => {
    axios.put(`http://localhost:8762/game-session-handler/${sessionId}/${answer}`)
    .then((res)=>{
        console.log(res.data);
        setIsActive(res.data.isActive);
        setQuestionCounter(res.data.currentRound)
        if(res.data.currentRound>NUMBER_OF_QUESTIONS){
            setIsVictory(true);
            setIsActive(false);
            axios.put(`http://localhost:8762/game-session-handler/setActive/${sessionId}/${false}`)
            .then((res)=>{
                console.log(res.data);
            });
        }
        else{
            axios.get(`http://localhost:8762/question-handler/render/${res.data.currentQuestion}`)
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
                <div className="utilityContainer">
                    <p>{questionCounter}/{NUMBER_OF_QUESTIONS}</p>
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
                isVictory ? 
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
  

export default SoloGamePlay;
