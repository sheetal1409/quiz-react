import React from "react"

export default function Rules(props) {
    return (
        <div className="rules-container">
            <h1 className="rule-desc">The Game Rules are as follows:</h1>
            <ul className="rules-set">
                <li>The game consists of 10 questions from random category</li>
                <li>The player will get 2 life options: 50-50 & Swap question</li>
                <li>For every correct answer the player will earn $1000</li>
            </ul>
            <button className="rules-button" onClick={props.startQuiz}>Click to Start</button>
        </div>
    )
}