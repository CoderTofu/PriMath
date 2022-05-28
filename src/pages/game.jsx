import React, {useEffect, useState, useRef} from "react"

import "../css/page-css/game.css"

export default function Game(props) {
    let stringedChallenges = window.localStorage.getItem("challenges");
    let parsedChallenges = JSON.parse(stringedChallenges);

    // DON'T FORGET TO CHECK IF PARSEDCHALLENGES IS NULL

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
    let timeStarted = useRef("");
    let timeCheck = useRef(""); // This will help keep track how long it takes for user to answer a question 

    function stopCountdown() {
        setCurrentQuestion(listOfQuestions.current[questionCount]);
        setQuestionCount(questionCount + 1);
        clearTimeout(timer);
        timeStarted.current = new Date();
        timeCheck.current = timeStarted.current;
    }

    /**
     * Set a timer for 3 seconds before the game actually starts.
     * Set a timer for how long the player would take to answer.
     * Create the questions with appropriate types and min max values.
     * Once all 20 questions are completed and generated present them one by one to the user.
     * The user should be able to press enter and click a button to submit their answer.
     * After they submit it, the next question would then be presented to them.
     * 
     * This is how the score should be calculated by their type:
     * addition *1
     * subtraction *1.2
     * mulitplication *1.5
     * division *1.7
     * 
     * This is how the score should be calculated by their range (max range - min range):
     * difference of 1-5 + *0.5
     * difference of 6-20 + *1
     * difference of 21-50 + *1.5
     * difference of 51-100 + *1.8
     * difference of 101-500 + *2.2
     * difference of 501-1000 + *2.5
     * 
     * This is how the score should be calculated by time (time it took to answer)
     * <2 seconds 150
     * >2<5 seconds 110
     * >5>7 seconds 90
     * >7>10 seconds 70
     * >10 seconds 50
     */

    // 
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    function generateQuestions() {
        let questionType = parsedChallenges[Math.floor(Math.random() * parsedChallenges.length)];
        let operation = questionType.name;
        let firstValue = getRandomInt(questionType.min_val, questionType.max_val);
        let secondValue = getRandomInt(questionType.min_val, questionType.max_val);
        let answer, symbol;
        if (operation === "Addition") {
            answer = genChallengeAddition(firstValue, secondValue);
            symbol = "+";
        } else if (operation === "Subtraction") {
            answer = genChallengeSubtraction(firstValue, secondValue);
            symbol = "-";
        } else if (operation === "Multiplication") {
            answer = genChallengeMultiplication(firstValue, secondValue);
            symbol = "x";
        } else if (operation === "Division") {
            answer = genChallengeDivision(firstValue, secondValue);
            symbol = "/"
        }
        const question = {
            type: operation,
            first_value: firstValue,
            second_value: secondValue,
            symbol: symbol,
            answer: roundToTwo(answer)
        }
        return question
    }

    // Basic Arithmetic Functions
        function genChallengeAddition(value1, value2) {
            return value1 + value2
        }

        function genChallengeSubtraction(value1, value2) {
            return value1 - value2
        }

        function genChallengeMultiplication(value1, value2) {
            return value1 * value2
        }

        function genChallengeDivision(value1, value2) {
            return value1 / value2
        }
    // 

    function updateQuestion() {
        if (answer === "") return
        currentQuestion.user_answer = parseInt(answer); // Add a key for user's answer
        
        let newTime = new Date();
        let miliToSeconds = 1000 
        currentQuestion.time_taken = (newTime.getTime() - timeCheck.current.getTime()) / 1000;
        
        listOfQuestions.current[questionCount] = currentQuestion; // update the list of question now with the user's answer

        if (currentQuestion.user_answer === currentQuestion.answer) {
            correctSFX.play()
        } else {
            wrongSFX.play()
        }

        console.log(currentQuestion.time_taken)

        if (listOfQuestions.current[questionCount + 1] === undefined) {
            // Stop going to the next question because you are now in last
            return
        }

        setQuestionCount(questionCount += 1); // Move up to the next question
        setCurrentQuestion(listOfQuestions.current[questionCount]); // Update the current question to the next
        setAnswer(""); // Reset the input
        timeCheck.current = newTime
    }

    function updateScore(question) {
        let typeMultiplier;
        let valueDifference;
        let offPoints;
    }

    useEffect(() => {
        document.title = "Game"
        // Countdown timer
        timer = setInterval(() => {
            setCountdownTime(count => {
                if (count === 1) {
                    // Generate 20 questions
                    for (let i = 0; i < 20; i++) {
                        listOfQuestions.current = [...listOfQuestions.current, generateQuestions(parsedChallenges)]
                    }
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
            </div>
        </div>
    )
}