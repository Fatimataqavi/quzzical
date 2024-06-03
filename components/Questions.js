import React from "react"
import SingleQuestion from "./SingleQuestion"

export default function Questions(props){
    const[questions, setQuestions]= React.useState([])
    const [questionData, setQuestionData] = React.useState([]) 
    const [warning, setWarning]= React.useState(false) 
    const [score, setScore]= React.useState(0)
    const [result, setResult]= React.useState(false)
    
    React.useEffect(()=>{
        if(questions.length === 0){
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res=>res.json())
        .then(data=>{
            setQuestions(data.results)
            setQuestionData(
                data.results.map((questionItem)=>{
                    return {
                        question: questionItem.question,
                        shuffleAnswers: shuffle([...questionItem.incorrect_answers, questionItem.correct_answer]),
                        correctAnswer: questionItem.correct_answer,
                        selectedAnswer: ""
                    }
                })
            )
        })
        
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
     }
     }  
    },[questions])
    
    function updateAnswer(currentQuestion, answer){
        setQuestionData(questionData.map((questionItem)=>{
            return questionItem.question === currentQuestion ? {...questionItem, selectedAnswer: answer}: questionItem
        }))
    }
    function checkAnswers(){
        const notAllAnswered= questionData.some(
            (questionItem) => questionItem.selectedAnswer === "")
            setWarning(notAllAnswered)
            
            if(!notAllAnswered){
                questionData.forEach(questionItem =>{
                    if(questionItem.correctAnswer === questionItem.selectedAnswer){
                        setScore(prevScore=> prevScore +1)
                    }
                })
                setResult(true)
            }   
    }
    function playAgain(){
        setQuestions([])
        setQuestionData([])
        setResult(false)
        setScore(0)
    }

    const questionElement=questionData.map((questionItem, index)=>{
                return(
                    <SingleQuestion
                    key={index}
                    question={questionItem.question}
                    allAnswers={questionItem.shuffleAnswers} 
                    selectedAnswer= {questionItem.selectedAnswer}
                    updateAnswer={updateAnswer}
                    result={result}
                    correctAnswer={questionItem.correctAnswer}
                    />
            )})

    return(
        <div className="hero">
            {questionElement}
            <div className="checking-container">
                { warning && 
                (<p className="warning">
                Please check if all questions answered!
                </p>)}
                {questions.length>0 && !result ?
                ( <button className="check-answer" 
                onClick={checkAnswers}>
                Check answers</button>)
                : null}
            </div>
            { result &&
              <div className="result">
                <p className="result-msg">You scored {score}/5 correct answers</p>
                <button className="play-again" onClick={playAgain}>play again</button>
              </div>  
            }
            
        </div>
    )
}