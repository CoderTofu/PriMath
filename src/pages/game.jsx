import React, {useEffect} from "react"

export default function Game(props) {
    let stringedChallenges = window.localStorage.getItem("challenges");
    let parsedChallenges = JSON.parse(stringedChallenges);
    console.log(parsedChallenges)

    /**
     * Set a timer for 3 seconds before the game actually starts.
     * Set a timer for how long the player would take to answer.
     * Generate 20 questions in random types of challenges.
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

    // function genChallengeAddition() {

    // }

    // function genChallengeSubtraction() {

    // }

    // function genChallengeMultiplication() {

    // }

    // function genChallengeDivision() {

    // }

    useEffect(() => {
        document.title = "Game"
    }, [])

    return (
        <div>
            {parsedChallenges.map((item, index) => {
                return (
                    <div key={index}>
                        <h2>Type: {item.name}</h2>
                        <h3>Min Val: {item.min_val}</h3>
                        <h3>Max Val: {item.max_val}</h3>
                    </div>
                )
            })}
        </div>
    )
}