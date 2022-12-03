import React from "react"


export default function MainPage(props) {

    return (
        <main className="main-container">
            <h2 className="topic">KBC</h2>
            <h5 className="desc">Welcome to KBC season 12</h5>
            <button className="quiz-button" onClick={props.onClick}>
                Click To Begin
            </button>
        </main>
    )
}