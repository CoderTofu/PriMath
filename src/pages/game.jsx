import React, {useEffect, useState, useRef} from "react"
import { useNavigate } from "react-router-dom";

import generateQuestions from "./gameFuncs/questionGen";
import checkVals from './gameFuncs/checkValue';

import "../css/page-css/game.css"

export default function Game(props) {
    let stringedChallenges = window.localStorage.getItem("challenges");
    let parsedChallenges = JSON.parse(stringedChallenges);
    let navigate = useNavigate()

    // Countdown to start the game
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
    const timeCheck = useRef(""); // This will help keep track how long it takes for user to answer a question
    const score = useRef(0); 

    function stopCountdown() {
        setCurrentQuestion(listOfQuestions.current[questionCount]);
        clearTimeout(timer);
        timeStarted.current = new Date();
        timeCheck.current = timeStarted.current;
    }

    function updateQuestion() {
        if (answer === "") return
        currentQuestion.user_answer = parseFloat(answer); // Add a key for user's answer
        
        let newTime = new Date();
        let miliToSeconds = 1000 
        currentQuestion.time_taken = (newTime.getTime() - timeCheck.current.getTime()) / miliToSeconds;
        
        listOfQuestions.current[questionCount] = currentQuestion; // update the list of question now with the user's answer

        updateScore(questionCount); // update user's score

        if (listOfQuestions.current[questionCount + 1] !== undefined) { // If we are not yet on the last item
            setQuestionCount(questionCount += 1); // Move up to the next question
            setCurrentQuestion(listOfQuestions.current[questionCount]); // Update the current question to the next
        } else {
            setEnd(true)
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
            } else if (timeTaken > 10) {
                basePoints = 50;
            }

            const POINTS = Math.ceil((((basePoints) * typeMultiplier) * valueDifference) + offPoints);

            score.current = score.current + POINTS;
            questionStats.current.correct += 1;
            questionStats.current[currentQuestion.type.toLowerCase()].correct += 1
        } else {
            questionStats.current.mistake += 1;
        }
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
        console.log(listOfQuestions.current)
        // Countdown timer
        timer = setInterval(() => {
            setCountdownTime(count => {
                if (count === 1) {
                    // Stop countdown
                    return stopCountdown()
                }
                return count - 1
            })
        }, 1000)
    }, [])

    return (
        <div>
            {countdownTime > 0 ? (
                <div className={`screen`}>
                    <h1>{countdownTime}</h1>
                </div>
            ) : ("")}

            {end ? (
                <div>
                    GOODBYE
                    <h3>Score: {score.current}</h3>
                    <h3>Time: {timeCheck.current - timeStarted.current}</h3>
                    <h3>Percentage: {Math.floor((questionStats.current.correct / (questionStats.current.correct + questionStats.current.mistake)) * 100)}</h3>
                    <div>
                        {parsedChallenges.map((challenge, ind) => {
                            return (
                                <div key={`${challenge.name}${ind}`}>
                                    <h3>{challenge.name}</h3>
                                    <h4>Overall: {questionStats.current[challenge.name.toLowerCase()].correct}/{questionStats.current[challenge.name.toLowerCase()].appearance}</h4>
                                    <h4>Range: {challenge.min_val} - {challenge.max_val}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
            <div>
                <h1>{currentQuestion.type}</h1>
                <form>
                    <p>{questionCount}</p>
                    <label htmlFor="answer">{currentQuestion.first_value} {currentQuestion.symbol} {currentQuestion.second_value}</label>
                    <input
                        type="number"
                        name="answer"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)} />
                    <button onClick={e => {
                        e.preventDefault();
                        updateQuestion()
                    }}>Submit</button>
                </form>
                {score.current}
            </div>)
            }
        </div>
    )
}