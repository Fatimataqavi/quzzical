import React from "react"
import {decode} from 'html-entities'
export default function SingleQuestion(props){
    
    function toggleClick(answer, currentQuestion){
        props.updateAnswer(currentQuestion, answer)
    }
    const answersArray=props.allAnswers.map((answer, index)=>{
        return <button
         className={`answer-btn 
         ${answer === props.selectedAnswer ? "selected" : ""}
         ${props.result && answer === props.correctAnswer ? "correct" : ""}
         ${props.result && answer === props.selectedAnswer &&
          answer !== props.correctAnswer ? "incorrect" : ""}
          ${props.result && answer !== props.correctAnswer ? "dim" : ""}
          `}
         onClick={() => toggleClick(answer, props.question)} 
         key={index}
        disabled={props.result}
          >
         {decode(answer)}
         </button>
     })
    return(
        <div className="question-container">
            <h2 className="question">{decode(props.question)}</h2>
            <div className="answers-container">{answersArray}</div>
        </div>
    )
}