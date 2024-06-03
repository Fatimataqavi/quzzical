import React from "react"
export default function FirstPage(props){
    return(
        <div className="first-page">
            <h1>Quizzical</h1>
            <p>Powered by Scrimba</p>
            <button
                className="start-btn"
                onClick={() => props.setQuestionsPage(true)}>
                Start quiz
            </button>
        </div>
    )
}