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
    const timeStarted = useRef("");
    const timeCheck = useRef(""); // This will help keep track how long it takes for user to answer a question
    const score = useRef(0); 

    // Facts
    let [fact, changeFact] = useState("")

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
     * <1 seconds 200
     * >1<2 seconds 150
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
        let answer, symbol, type_multiplier, range_multiplier;

        // Set keys for important and specific to type questions
        if (operation === "Addition") {
            answer = genChallengeAddition(firstValue, secondValue);
            symbol = "+";
            type_multiplier = 1;
        } else if (operation === "Subtraction") {
            answer = genChallengeSubtraction(firstValue, secondValue);
            symbol = "-";
            type_multiplier = 1.2;
        } else if (operation === "Multiplication") {
            answer = genChallengeMultiplication(firstValue, secondValue);
            symbol = "x";
            type_multiplier = 1.5;
        } else if (operation === "Division") {
            answer = genChallengeDivision(firstValue, secondValue);
            symbol = "/";
            type_multiplier = 1.7;
        }

        // Set additional points multiplier for value range
        let valueDifference = Math.abs(firstValue, secondValue);
        if (valueDifference <= 5) {
            range_multiplier = 1.5;
        } else if (valueDifference <= 20) {
            range_multiplier = 2;
        } else if (valueDifference <= 50) {
            range_multiplier = 2.5;
        } else if (valueDifference <= 100) {
            range_multiplier = 3;
        } else if (valueDifference <= 500) {
            range_multiplier = 3.5;
        } else if (valueDifference <= 1000) {
            range_multiplier = 4;
        }

        const question = {
            type: operation,
            first_value: firstValue,
            second_value: secondValue,
            symbol: symbol,
            answer: roundToTwo(answer),
            type_multiplier,
            range_multiplier
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

    useEffect(() => {
        if (currentQuestion === "") return
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://numbersapi.com/${currentQuestion.first_value}`);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status === 200) {
                changeFact(xhr.response);
            }
        };
    }, [currentQuestion])

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

            <div>
                {fact}
            </div>
        </div>
    )
}