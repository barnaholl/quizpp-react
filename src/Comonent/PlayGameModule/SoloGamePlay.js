import React, { useEffect, useState } from "react";
import axios from "axios";
import {POST_CONFIG,GET_CONFIG} from "./../Constants";

const SoloGamePlay = (props) =>{

    const NUMBER_OF_QUESTIONS=3;
    const SCORE=10;

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
            axios.get("http://localhost:8762/jwtUtils/username",GET_CONFIG)
            .then(res=>{
                axios.put(`http://localhost:8762/user-handler/user-currency/${res.data}/${SCORE}`,"body",GET_CONFIG);
                window.location.reload();
                
            });
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
            <div style={gameContainerStyle}>

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
                
                <div style={answerContainerStyle}>
                    <div style={answerStyle}>
                        <p onClick={()=>chooseAnswer(question.answer1)} >{question.answer1}</p>
                    </div>
                    <div style={answerStyle}>
                        <p onClick={()=>chooseAnswer(question.answer2)} >{question.answer2}</p> 
                    </div>
                    <div style={answerStyle}>
                        <p onClick={()=>chooseAnswer(question.answer3)} >{question.answer3}</p>
                    </div>
                    <div style={answerStyle}>
                        <p onClick={()=>chooseAnswer(question.answer4)} >{question.answer4}</p>
                    </div>
                </div>
            </div>

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
const gameContainerStyle = {
    width: "1fr",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "5rem 5rem 10rem 20rem",
    background: "white",
    boxShadow:" 5px 5px 15px rgba(0,0,0,0.9)",
    fontFamily: "roboto",
    textAlign: "center",
    backgroundColor: "rgb(242, 242, 242)",
}

const questionStyle = {
    textAlign:"center",
    fontSize:"2.5rem" 
  };

const answerStyle = {
    width: "1fr",
    height: "8rem",
    backgroundColor: "blue",
    borderRadius:"button-radius",
    padding:"normal",
    textAlign:"center",
    cursor:"pointer",
    color:"white",
    fontSize:"3rem" 
  };

  const answerContainerStyle = {
    width: "1fr",
    height: "18rem",
    display: "grid",
    gap : "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(30rem, 1fr))",
  };
  
  const utilityContainerStyle = {
    display: "grid",
    gap : "1rem",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr",
  };

export default SoloGamePlay;

