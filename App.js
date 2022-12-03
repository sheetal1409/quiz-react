import React from "react"
import MainPage from "./MainPage"
import Rules from "./Rules"
import GamePage from "./GamePage"

export default function App() {
  const [startGame, setStartGame] = React.useState(false)
  const [rules, setRules] = React.useState(false)
  function checkRules() {
    setRules(true)
  }
  function startQuiz() {
    setStartGame((true))
    setRules(!rules)
  }
  return (<div>
    {!startGame && !rules && <MainPage onClick={checkRules} />}
    {rules && <Rules startQuiz={startQuiz} />}
    {startGame && <GamePage />}
  </div>
  )
}