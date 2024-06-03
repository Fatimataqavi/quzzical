import React from "react"
import Questions from "./components/Questions"
import FirstPage from "./components/FirstPage"

export default function App(){
    const [questionsPage, setQuestionsPage]=React.useState(false)
    
    return (
        <main>
             { questionsPage? 
             <Questions />: 
             <FirstPage setQuestionsPage={setQuestionsPage}/>}
        </main>
    )
}