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
    let [questionCount, setQuestionCount] = useState(0)
    let [currentQuestion, setCurrentQuestion] = useState("");

    // Form
    const correctSFX = document.getElementById("correct-sound");
    const wrongSFX = document.getElementById("wrong-sound");
    let [answer, setAnswer] = useState("");

    // Scoring
    const timeStarted = useRef("");
    const timeCheck = useRef(""); // This will help keep track how long it takes for user to answer a question
    const score = useRef(0); 

    function stopCountdown() {
        setCurrentQuestion(listOfQuestions.current[questionCount]);
        setQuestionCount(questionCount + 1);
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
        }

        setAnswer(""); // Reset the input
        timeCheck.current = newTime;
    }

    function updateScore(questionNum) {
        const QUESTION = listOfQuestions.current[questionNum];
        if (currentQuestion.user_answer === currentQuestion.answer) {
            correctSFX.play()
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

            score.current = score.current + POINTS
        } else {
            wrongSFX.play()
            return
        }
    }

    useEffect(() => {
        document.title = "Game";
        // Checks if values are valid and can be used properly
        if (parsedChallenges === null || typeof (checkVals(parsedChallenges)) === "object") {
            alert("Your challenges are invalid.")
            console.log(navigate('../challenges'))
            return
        }

        // Generate 20 questions
        for (let i = 0; i < 20; i++) {
            listOfQuestions.current = [...listOfQuestions.current, generateQuestions(parsedChallenges)]
        }
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

            <div>
                <form>
                    <label htmlFor="answer">{currentQuestion.first_value} {currentQuestion.symbol} {currentQuestion.second_value}</label>
                    <input 
                    type="number" 
                    name="answer" 
                    value={answer} 
                    onChange={e => setAnswer(e.target.value)}/>
                    <button onClick={e => {
                        correctSFX.pause();
                        correctSFX.currentTime = 0;
                        wrongSFX.pause();
                        wrongSFX.currentTime = 0;
                        e.preventDefault();
                        updateQuestion()
                    }}>Submit</button>
                </form>
                <audio id="correct-sound" src="/correct.mp4"></audio>
                <audio id="wrong-sound" src="/wrong.mp4"></audio>
                {score.current}
            </div>
        </div>
    )
}