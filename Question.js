import React from "react"
import LifeOpt from "./LifeOpt";
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function style(answerSelected, correctAnswer, win, option) {

    let backgroundColor = ""
    if (!win) {
        if (answerSelected === option) {
            backgroundColor = "grey"
        }
        else {
            backgroundColor = "white"

        }
    }
    else {
        if (correctAnswer === option) {
            backgroundColor = "green"
        }
        else if (answerSelected === option) {
            backgroundColor = "red"
        } else {
            backgroundColor = "white"
        }
    }

    return { backgroundColor }

}



export default function Question() {
    const [questionAns, setQuestionAns] = React.useState({
        question: "",
        options: []
    })

    const [amount, setAmount] = React.useState(false)
    const [total, setTotal] = React.useState(0)

    const [quiz, setQuiz] = React.useState(true)
    const [lifeline, setLifeLine] = React.useState(false)
    const [optionSelected, setOptionSelected] = React.useState({
        opt1: false,
        opt2: false
    })
    const [correctAnswer, setCorrectAnswer] = React.useState("")
    const [answerSelected, setAnswerSelected] = React.useState("")
    const [win, setWin] = React.useState(false)
    const [lost, setLost] = React.useState(false)



    function setInitalValue() {

        fetch(`https://opentdb.com/api.php?amount=${count}`)
            .then(res => res.json())
            .then(data => {
                let options = []
                options = data.results[0].incorrect_answers
                options.unshift(data.results[0].correct_answer)
                shuffleArray(options)
                setQuestionAns({
                    question: data.results[0].question,
                    options: options
                })
                setCorrectAnswer(data.results[0].correct_answer)
            })
    }

    function use1life() {

        setOptionSelected(oldValue => {
            return {
                ...oldValue, opt1: true
            }
        })


    }

    function use2life() {

        setOptionSelected(oldValue => {
            return {
                ...oldValue, opt2: true
            }
        })


    }

    const count = "1"
    React.useEffect(() => {

        fetch(`https://opentdb.com/api.php?amount=${count}`)
            .then(res => res.json())
            .then(data => {
                let options = []
                options = data.results[0].incorrect_answers
                options.unshift(data.results[0].correct_answer)
                shuffleArray(options)
                setQuestionAns({
                    question: data.results[0].question,
                    options: options
                })
                setCorrectAnswer(data.results[0].correct_answer)
            })

    }, [quiz])
    console.log(correctAnswer)
    function answerSelect(event) {
        setAnswerSelected(event.target.getAttribute("name"))
    }
    function checkAns() {
        setWin(true)
        if (correctAnswer === answerSelected) {
            setAmount(true)
            setTotal(oldValue => oldValue + 1000)
        } else {
            setLost(true)
        }
    }


    let lis = []
    if (optionSelected.opt1) {
        lis.push(<li name={correctAnswer} className="answer-options" style={style(answerSelected, correctAnswer, win, correctAnswer)}>{correctAnswer}</li>)
        for (let option of questionAns.options) {
            if (option !== correctAnswer) {
                lis.push(<li className="answer-options" name={option} style={style(answerSelected, correctAnswer, win, option)}>{option}</li>)
                break
            }
        }
    }
    else {
        lis = questionAns.options.map((option, index) => <li className="answer-options"
            style={style(answerSelected, correctAnswer, win, option)} name={option} id={index}>{option}</li>)
    }
    return (
        <div className="lifeadded">
            <LifeOpt optionSelected={optionSelected} onFiftyClick={use1life} onSwapClick={use2life} />

            <div className="question-box  border-gradient border-gradient-purple">
                <div>
                    <h2 className="question-style"
                        dangerouslySetInnerHTML={{ __html: questionAns.question }}></h2>
                    <ul onClick={answerSelect} >{lis}</ul>
                </div>
                {!win && <button className="checkAns" onClick={checkAns}>Check Answer</button>}
                {win && <button className="checkAns" style={{
                    backgroundColor: lost ? "black" : "white",
                    color: lost ? "white" : "blue"
                }} disabled={lost} onClick={setInitalValue}>{!lost ? "Next Question" : "BAD LUCK"}</button>}
            </div>
            {amount && <h2>Congratulation you have won ${total}</h2>}
        </div>
    )
}