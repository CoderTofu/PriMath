import React from "react"
import { useEffect, useState } from 'react';

import "../css/page-css/challenges.css"

export default function Challenges(props) {
    let mode = props.viewMode

    // Available challenges buttons
    let [available, changeAvailable] = useState(["Addition", "Subtraction", "Multiplication", "Division"]);
    let [availableButtons, changeAvailableButtons] = useState([])

    // Selected challenges buttons
    let [selected, changeSelected] = useState([])
    let [selectedButtons, changeSelectButtons] = useState([])

    // For edit form
    let [editSelect, changeEditSelect] = useState("")
    let [showEdit, changeShowEdit] = useState("hide")
    let [minRange, setMinRange] = useState(1)
    let [maxRange, setMaxRange] = useState(10)


    function addChallenge(id) {
        let element = document.getElementById(id);

        changeAvailable(arr => arr.filter((value) => {
            return value !== element.value
        }))
            
        changeSelected(arr => [...arr, {
            name: element.value,
            min_range: 1,
            max_range: 10
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
            onInputMinRange(editSelect.min_range, editSelect)
            onInputMaxRange(editSelect.max_range, editSelect)
        }

        changeShowEdit("show") // show the hidden edit section
        changeEditSelect(type) // selects the user selected type

        // set the input to appropriate value
        onInputMinRange(type.min_range, type)
        onInputMaxRange(type.max_range, type)
    }

    function onInputMinRange(value, userSelected) {
        try {
            let numberValue = parseInt(value) || 1;
            if (numberValue > maxRange) {
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
    
    function onInputMaxRange(value, userSelected) {
        try {
            let numberValue = parseInt(value) || 1;
            if (numberValue < minRange) {
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
        console.log(selected)
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
                        value={minRange}
                        onChange={e => onInputMinRange(e.target.value, editSelect)} 
                    />

                    <br />

                    <label htmlFor="min_range">Maximum: </label>
                    <input 
                        type="number" 
                        name="min_range"
                        value={maxRange}
                        onChange={e => onInputMaxRange(e.target.value, editSelect)} 
                    />

                </form>
            </div>

            <button onClick={start}>START!</button>

        </div>
    )
}