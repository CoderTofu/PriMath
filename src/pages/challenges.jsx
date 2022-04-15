import React from "react"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../css/page-css/challenges.css"

export default function Challenges(props) {
    let mode = props.viewMode

    let navigate = useNavigate();

    // Available challenges buttons
    let [available, changeAvailable] = useState(["Addition", "Subtraction", "Multiplication", "Division"]);
    let [availableButtons, changeAvailableButtons] = useState([])

    // Selected challenges buttons
    let [selected, changeSelected] = useState([])
    let [selectedButtons, changeSelectButtons] = useState([])

    // For edit form
    let [editSelect, changeEditSelect] = useState("")
    let [showEdit, changeShowEdit] = useState("hide")
    let [minVal, setMinRange] = useState(1)
    let [maxVal, setMaxRange] = useState(10)


    function addChallenge(id) {
        let element = document.getElementById(id);

        changeAvailable(arr => arr.filter((value) => {
            return value !== element.value
        }))
            
        changeSelected(arr => [...arr, {
            name: element.value,
            min_val: 1,
            max_val: 10
        }])
    }

    function removeChallenge(type) {
        changeSelected(arr => arr.filter((value) => {
            return value !== type
        }))

        changeAvailable(arr => [...arr, type.name])
    }

    function editChallenge(type) { 
        if (editSelect !== "") {
            onInputMinValue(editSelect.min_val, editSelect)
            onInputMaxValue(editSelect.max_val, editSelect)
        }

        changeShowEdit("show") // show the hidden edit section
        changeEditSelect(type) // selects the user selected type

        // set the input to appropriate value
        onInputMinValue(type.min_val, type)
        onInputMaxValue(type.max_val, type)
    }

    function onInputMinValue(value, userSelected) {
        try {
            let numberValue = parseInt(value);
            if (numberValue <= 0) {
                console.log("Minimum value can't be zero.")
                return
            } else if (numberValue > maxVal) {
                console.log("Minimum value can't be higher than the maximum value.")
                return
            }
            setMinRange(numberValue);
            let index = selected.indexOf(userSelected);
            userSelected.min_range = numberValue;
            selected[index] = userSelected;
        } catch (e) {
            console.log("Something went wrong: " + e);
        }
    }

    function onInputMaxValue(value, userSelected) {
        try {
            let numberValue = parseInt(value) || 1;
            if (numberValue > 1000) {
                numberValue = 1000
                console.log("Can't go higher than 1000.")
            }
            if (numberValue < minVal) {
                console.log("Maximum value can't be lower than the minimum value.")
                return
            }
            setMaxRange(numberValue);
            let index = selected.indexOf(userSelected);
            userSelected.max_range = numberValue;
            selected[index] = userSelected
        } catch (e) {
            console.log("Something went wrong: " + e);
        }
    }

    function start() {
        const routeChange = () => {
            let path = `game`;
            navigate(path);
        }
        if (selected.length === 0) {
            alert("You have to select at least one challenge.")
        } else  {
            routeChange()
            let stringed = JSON.stringify(selected)
            window.localStorage.setItem("challenges", stringed)
        }
    }

    // This useEffect is made to initialize the buttons utilized to select the challenges that a user can pick.
    useEffect(() => {
        changeAvailableButtons([]);

        available.sort()
        available.map((type, index) => {
            try {
                let createID = `available${index}`

                let createdButton = (
                    <button
                    className="available-btn" 
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
    }, [available])

    // This useEffect is made to create a set of buttons that the player already chose.
    useEffect(() => {
        changeSelectButtons([])
        
        selected.map((type, index) => {
            try {
                let createID = `selected${index}`

                let createdButton = (
                    <div
                        id={createID}
                        key={createID}>
                        {type.name}
                        <div>
                            <button 
                                onClick={() => {editChallenge(type)}}>
                                    Edit
                            </button>
                            <button
                                onClick={() => {removeChallenge(type, createID)}}>
                                Delete
                            </button>
                        </div>
                    </div>
                )
                changeSelectButtons(arr => [...arr, createdButton])
                return "success"
            } catch (e) {
                console.log(e)
                return "fail"
            }
        })
    }, [selected])

    /**
     * Add a problem section for the container. 
     * This way the user would know what the problem could be.
     */

    return (
        <div className={`challenge-container ${mode}`}>

            <div className={`available-container ${mode}`}>
                <div className="content-header">Available Challenges:</div>
                <div className="button-container">
                    {availableButtons}
                </div>
            </div>

            <div className={`selected-container ${mode}`}>
                <div className="content-header">Selected Challenges:</div>
                <div>
                    {selectedButtons}
                </div>
            </div>

            <div className={`edit-container ${showEdit} ${mode}`}>
                <div className="content-header">Edit the challenge range!</div>
                <form>

                    <h2>{editSelect.name}</h2>
                    <label htmlFor="min_range">Minimum: </label>
                    <input 
                        type="number"
                        name="min_range"
                        value={minVal}
                        onChange={e => onInputMinValue(e.target.value, editSelect)} 
                    />

                    <br />

                    <label htmlFor="min_range">Maximum: </label>
                    <input 
                        type="number" 
                        name="min_range"
                        value={maxVal}
                        onChange={e => onInputMaxValue(e.target.value, editSelect)} 
                    />

                </form>
            </div>

            {/* 
                Save the challenge list with their values in local storage.
                Redirect to challenges/game. 
                If walang nakasave sa localstorage na list of challenges or if error, 
                just do an alert and prevent them from accessing the game page. 
            */}

            <button onClick={start}>START!</button>

        </div>
    )
}