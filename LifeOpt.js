import React from "react"

export default function LifeOpt({ optionSelected, onFiftyClick, onSwapClick }) {
    return (
        <div className="lifeopt-container">
            <h1>Life Lines Available:</h1>
            <button disabled={optionSelected.opt1} className="lifeopt" onClick={onFiftyClick}>50-50</button>
            <button disabled={optionSelected.opt2} className="lifeopt" onClick={onSwapClick}>Swap Question</button>
        </div>
    )
}