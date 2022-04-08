import React from "react"
import { useEffect, useState } from 'react';

export default function Challenges(props) {
    // let mode = props.viewMode

    // Available challenges buttons
    let available = ["Addition", "Subtraction", "Multiplication", "Division"];
    let [availableButtons, changeAvailableButtons] = useState([])

    // Selected challenges buttons
    let [selected, changeSelected] = useState([])
    let [selectedButtons, changeSelectButtons] = useState([])


    function addChallenge(id) {
        let element = document.getElementById(id);
        changeSelected(arr => [...arr, {
            name: element.value,
            min_range: 0,
            max_range: 10
        }])
        element.remove() // Removes the button that you pressed
    }

    function removeChallenge() {

    }

    function challengeRange() {

    }

    // This useEffect is made to initialize the buttons utilized to select the challenges that a user can pick.
    useEffect(() => {
        changeAvailableButtons([])
        available.map((type, index) => {
            try {
                let createID = `available${index}`

                let createdButton = (
                    <button 
                    id={createID}
                    onClick={() => {addChallenge(createID)}} 
                    key={createID}
                    value={type}>
                        {type}
                    </button>
                )

                changeAvailableButtons(arr => [...arr, createdButton])
                return "success"   
            } catch(e) {
                console.log(e)
                return "fail"
            }
        })
    }, [])

    // This useEffect is made to create a set of buttons that the player chose.
    useEffect(() => {
        changeSelectButtons([])
        selected.map((type, index) => {
            try {
                let createID = `selected${index}`

                let createdButton = (
                    <button
                        id={createID}
                        key={createID}
                        value={type.name}>
                        {type.name}
                    </button>
                )

                changeSelectButtons(arr => [...arr, createdButton])
                return "success"
            } catch (e) {
                console.log(e)
                return "fail"
            }
        })
    }, [selected])

    return (
        <div>

            <div>
                <div>Available Challenges:</div>
                <div>
                    {availableButtons}
                </div>
            </div>

            <div>
                <div>Selected Challenges:</div>
                <div>
                    {selectedButtons}
                </div>
            </div>

            <div>
                <div>Edit the challenge range here:</div>
                <form>
                    <h2>{/* The challenge selected */}</h2>
                    <label htmlFor="min_range">Minimum: </label>
                    <input type="number" name="min_range" placeholder="1" />
                    <br />
                    <label htmlFor="min_range">Maximum: </label>
                    <input type="number" name="min_range" placeholder="1" />
                </form>
            </div>
        </div>
    )
}