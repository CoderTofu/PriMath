import React, {useEffect, useState, useRef} from "react"
import { useNavigate } from "react-router-dom";

import generateQuestions from "./gameFuncs/questionGen";
import checkVals from './gameFuncs/checkValue';

import "../css/page-css/game.css"

export default function Game(props) {
    let mode = props.viewMode;
    let setMenuDisplay = props.menu_display;
    let stringedChallenges = window.localStorage.getItem("challenges");
    let parsedChallenges = JSON.parse(stringedChallenges);
    let navigate = useNavigate();

    // Countdown to start the game
    const miliToSeconds = 1000;
    let [countdownTime, setCountdownTime] = useState(3);
    let timer = 0;

    // Questions
    const listOfQuestions = useRef([]);
    let [questionCount, setQuestionCount] = useState(0);
    let questionStats = useRef({
        addition: {appearance: 0, correct: 0},
        subtraction: { appearance: 0, correct: 0 },
        multiplication: { appearance: 0, correct: 0 },
        division: { appearance: 0, correct: 0 },
        correct: 0,
        mistake: 0
    })
    let [currentQuestion, setCurrentQuestion] = useState("");

    // Form
    let [answer, setAnswer] = useState("");
    let [end, setEnd] = useState(false);

    // Scoring
    const timeStarted = useRef("");
    const timeFinished = useRef("");
    const timeCheck = useRef(""); // This will help keep track how long it takes for user to answer a question
    const score = useRef(0);

    // End Screen
    let [isMore, setMore] = useState(false)

    function stopCountdown() {
        setCurrentQuestion(listOfQuestions.current[questionCount]);
        clearTimeout(timer);
        timeStarted.current = new Date();
        timeCheck.current = timeStarted.current;
        // Hide menu
        setMenuDisplay("hide")
    }

    function updateQuestion() {
        const FLOAT_ANSWER = parseFloat(answer);
        if (isNaN(FLOAT_ANSWER)) {
            setAnswer("ERROR")
            return
        }

        currentQuestion.user_answer = FLOAT_ANSWER; // Add a key for user's answer

        let newTime = new Date();
        currentQuestion.time_taken = (newTime.getTime() - timeCheck.current.getTime()) / miliToSeconds;

        listOfQuestions.current[questionCount] = currentQuestion; // update the list of question now with the user's answer

        updateScore(questionCount); // update user's score

        if (listOfQuestions.current[questionCount + 1] !== undefined) { // If we are not yet on the last item
            setQuestionCount(questionCount += 1); // Move up to the next question
            setCurrentQuestion(listOfQuestions.current[questionCount]); // Update the current question to the next
        } else {
            intEndGame()
        }

        setAnswer(""); // Reset the input
        timeCheck.current = newTime;
    }

    function updateScore(questionNum) {
        const QUESTION = listOfQuestions.current[questionNum];
        if (currentQuestion.user_answer === currentQuestion.answer) {
            let basePoints;
            let typeMultiplier = QUESTION.type_multiplier;
            let valueDifference = QUESTION.range_multiplier;
            let offPoints = Math.floor(Math.random() * (50 - 1) + 1);
            let timeTaken = QUESTION.time_taken;

            // The actual points you could get is based on the time taken you answer
            if (timeTaken <= 1) {
                basePoints = 200;
            } else if (timeTaken <= 2) {
                basePoints = 150;
            } else if (timeTaken <= 5) {
                basePoints = 90;
            } else if (timeTaken <= 7) {
                basePoints = 70;
            } else if (timeTaken <= 10) {
                basePoints = 50
            } else if (timeTaken > 10) {
                basePoints = 30;
            }

            const POINTS = Math.ceil((((basePoints) * typeMultiplier) * valueDifference) + offPoints);

            score.current = score.current + POINTS;
            questionStats.current.correct += 1;
            questionStats.current[currentQuestion.type.toLowerCase()].correct += 1
        } else {
            questionStats.current.mistake += 1;
        }
    }

    function intEndGame() { // Initiates end game phase
        const stopWatch = new Date()
        timeFinished.current = (stopWatch.getTime() - timeStarted.current.getTime()) / miliToSeconds;
        setEnd(true)
        // show menu
        setMenuDisplay("show")
    }

    function displayTimeTaken(given_seconds){ // To give the appropriate time to the user properly.
        if (given_seconds < 60) {
            return `${given_seconds.toFixed(1).toString()} seconds`
        } else {
            const minutes = Math.floor(given_seconds / 60);
            const seconds = (given_seconds % 60).toFixed(1);
            if (minutes > 1) {
                return `${minutes.toString()} minutes and ${seconds.toString()} seconds`
            } else {
                return `${minutes.toString()} minute and ${seconds.toString()} seconds`
            }
        }
    }

    function displayRightPercent(right, wrongs) { // To give a rounded up percentage, so it can look nice.
        const raw = Math.floor((right / (right + wrongs)) * 100);
        return raw.toFixed(2)
    }

    function displayTotal(right, wrongs) { // To give total score in fraction form.
        return `${right} / ${right + wrongs}`
    }

    useEffect(() => {
        document.title = "Game";
        // Checks if values are valid and can be used properly
        if (parsedChallenges === null || typeof (checkVals(parsedChallenges)) === "object") {
            alert("Your challenges are invalid.")
            navigate('../challenges')
            return
        }

        // Generate 20 questions
        for (let i = 0; i < 20; i++) {
            const generatedQuestion = generateQuestions(parsedChallenges);
            listOfQuestions.current = [...listOfQuestions.current, generatedQuestion];

            // STATS
            questionStats.current[generatedQuestion.type.toLowerCase()].appearance += 1
        }

        // Countdown timer
        timer = setInterval(() => {
            setCountdownTime(count => {
                if (count === 1) {
                    // Stop countdown
                    document.getElementsByClassName('game-input')[0].focus()
                    return stopCountdown()
                }
                return count - 1
            })
        }, 1000)

        
    }, [])

    return (
        <div>
            {countdownTime > 0 ? (
                <div className={`screen ${mode}`}>
                    <h1>{countdownTime}</h1>
                </div>
            ) : ("")}

            {end ? (
                <div className="end-screen">
                    <div className="end-main-stats">
                        <h1 className={`game-score ${mode}`}>{score.current}</h1>
                        <div className={`ratio-percent-container ${mode}`}>
                            <div className={`ratio-percent ${mode}`} style={{
                                width: `${displayRightPercent(questionStats.current.correct, questionStats.current.mistake)}%`
                            }} id="ratio-percent"></div>
                        </div>
                        <h3 className={`time-taken ${mode}`}>{displayTimeTaken(timeFinished.current)}</h3>
                    </div>

                    <div className={`end-nav ${mode}`}>
                        <button className="more-btn" onClick={() => {
                            setMore(!isMore)
                        }}>{isMore? ("see less"): ("see more")}</button>


                        <button className="again-btn" onClick={() => {
                            window.location.reload()
                        }}>play again</button>
                        <button className="back-btn" onClick={() => {
                            navigate('../challenges')
                        }}>back to select</button>
                    </div>

                    {isMore ? (
                    <div className="game-stats-container">
                        {parsedChallenges.map((challenge, ind) => {
                            return (
                                <div className={`challenge-stats ${mode}`} key={`${challenge.name}${ind}`}>
                                    <h3 className={`challenge-name ${mode}`}>{challenge.name}</h3>
                                    <h4 className="challenge-overall">Overall: {questionStats.current[challenge.name.toLowerCase()].correct}/{questionStats.current[challenge.name.toLowerCase()].appearance}</h4>
                                    <h4 className="challenge-range">Range: {challenge.min_val} - {challenge.max_val}</h4>
                                </div>
                            )
                        })}
                        <p className={`game-total ${mode}`}>Total: {displayTotal(questionStats.current.correct, questionStats.current.mistake)}</p>
                        <p className={`game-percent ${mode}`}>Percentage: {displayRightPercent(questionStats.current.correct, questionStats.current.mistake)}%</p>
                    </div>
                    ) : ("")}
                </div>
            ) : (
            <div className={`gameplay ${mode}`}>
                <h1 className={`question-num ${mode}`}>Question {questionCount + 1}:</h1>
                <form className={`game-form ${mode}`}>
                    <h2 className="game-question">{currentQuestion.first_value} {currentQuestion.symbol} {currentQuestion.second_value}</h2>
                    <div className={`input-container ${mode}`}>
                        <p className="challenge-type">{currentQuestion.type}</p>
                        <input
                            autoFocus
                            className={`game-input ${mode}`}
                            type="number"
                            name="answer"
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}/>
                    </div>

                    <button className={`ans-submit ${mode}`} onClick={e => {
                        e.preventDefault();
                        updateQuestion()
                    }}>Submit</button>
                </form>
            </div>)
            }
        </div>
    )
}