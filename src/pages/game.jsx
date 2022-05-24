import React, {useEffect, useState, useRef} from "react"

import "../css/page-css/game.css"

export default function Game(props) {
    let stringedChallenges = window.localStorage.getItem("challenges");
    let parsedChallenges = JSON.parse(stringedChallenges);
    // console.log(parsedChallenges)

    // Countdown to start the game
    let [countdownTime, setCountdownTime] = useState(3);
    let timer = 0;

    // Questions
    const listOfQuestions = useRef([])
    let [currentQuestion, setCurrentQuestion] = useState();

    function stopCountdown() {
        setCurrentQuestion(listOfQuestions.current[0])
        clearTimeout(timer)
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
     * difference of 1-5 *0.5
     * difference of 6-20 *1
     * difference of 21-50 *1.5
     * difference of 51-100 *1.8
     * difference of 101-500 *2.2
     * difference of 501-1000 *2.5
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
        let answer;
        if (operation === "Addition") {
            answer = genChallengeAddition(firstValue, secondValue);
        } else if (operation === "Subtraction") {
            answer = genChallengeSubtraction(firstValue, secondValue);
        } else if (operation === "Multiplication") {
            answer = genChallengeMultiplication(firstValue, secondValue);
        } else if (operation === "Division") {
            answer = genChallengeDivision(firstValue, secondValue);
        }
        const question = {
            type: operation,
            first_value: firstValue,
            second_value: secondValue,
            answer: roundToTwo(answer)
        }
        return question
    }

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

    useEffect(() => {
        document.title = "Game"
    }, [])

    useEffect(() => {
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
            {/* {parsedChallenges.map((item, index) => {
                return (
                    <div key={index}>
                        <h2>Type: {item.name}</h2>
                        <h3>Min Val: {item.min_val}</h3>
                        <h3>Max Val: {item.max_val}</h3>
                    </div>
                )
            })} */}
        </div>
    )
}