import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

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
    let [problems, updateProblems] = useState([])
    let [minVal, setMinVal] = useState(1)
    let [maxVal, setMaxVal] = useState(10)


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

        // reset the problems
        updateProblems([])
    }

    function onInputMinValue(value, userSelected) {
        try {
            let numberValue = parseInt(value);
            setMinVal(numberValue);

            // This 3 lines of code rewrites the user selected type values for min and max range
            let index = selected.indexOf(userSelected);
            userSelected.min_val = numberValue;
            selected[index] = userSelected;
        } catch (e) {
            console.log("Something went wrong: " + e);
        }
    }

    function onInputMaxValue(value, userSelected) {
        try {
            let numberValue = parseInt(value);
            setMaxVal(numberValue);

            // This 3 lines of code rewrites the user selected type values for min and max range
            let index = selected.indexOf(userSelected);
            userSelected.max_val = numberValue;
            selected[index] = userSelected;
        } catch (e) {
            console.log("Something went wrong: " + e);
        }
    }

    function checkVals() {
        // This function is to check whether the values given are appropriate
        let problemList = [];
        for (let i = 0; i < selected.length; i++) {
            let value = selected[i];
            let value_name = value.name;
            let maximum_value = value.max_val;
            let minimum_value = value.min_val;

            // Check if min val is greater than max val
            if (minimum_value > maximum_value) {
                problemList.push(`In ${value_name} challenge: The minimum value can't be greater than maximum value.`)
            }

            // Check if max val has value greater than 1000
            if (maximum_value > 1000) {
                problemList.push(`In ${value_name} challenge: The maximum value can't be greater than 1000.`)
            }

            if (minimum_value > 1000) {
                problemList.push(`In ${value_name} challenge: The minimum value can't be greater than 1000.`)
            }

            // Going below 1 for min value
            if (minimum_value < 1) {
                problemList.push(`In ${value_name} challenge: The minimum value can't be lower than 1.`)
            }

            if (maximum_value < 1) {
                problemList.push(`In ${value_name} challenge: The maximum value can't be lower than 1.`)
            }

            // Having null or empty strings for input
            if (minimum_value === "" || maximum_value === "" || isNaN(minimum_value) || isNaN(maximum_value)) {
                problemList.push(`In ${value_name} challenge: Values can't be empty.`)
            }
        }

        console.log(problemList)
        if (problemList.length === 0) {
            return true
        } else {
            updateProblems(problemList)
            return false
        }
    }

    function start() {
        const routeChange = () => {
            let path = `game`;
            navigate(path);
        }
        console.log(checkVals())
        if (selected.length === 0) {
            alert("You have to select at least one challenge.")
        } else if (checkVals())  {
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
                        key={createID}
                        className={`selected-btn`}>
                        {type.name}
                        <div className="util-btn">
                            <button className="edit-btn"
                                onClick={() => {editChallenge(type)}}>
                                    Edit
                            </button>
                            <button className="del-btn"
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

        if (!selected.includes(editSelect)) { // In case user tries to edit a challenge they already deleted
            changeShowEdit("hide")
        }
    }, [selected])

    useEffect(() => {
        document.title = "PriMath | Challenge Select"
    }, [])
    
    return (
        <div className={`challenge-container`}>

            <div className={`available-container ${mode}`}>
                <div className="content-header">Available Challenges:</div>
                <div className="available-btn-container">
                    {availableButtons}
                </div>
            </div>

            <div className={`selected-container ${mode}`}>
                <div className="content-header">Selected Challenges:</div>
                <div className={`selected-btn-container ${mode}`}>
                    {selectedButtons.length !== 0 ? selectedButtons : ""}
                </div>
            </div>

            <div className={`edit-container ${showEdit} ${mode}`}>
                <div className="content-header">Edit the challenge range!</div>
                <div className={`edit-input-container ${mode}`}>
                    <div className={`form-container ${mode}`}>
                        <h2 className={`selected-type ${mode}`}>~~{editSelect.name}~~</h2>
                        <form>
                            <label className={`label-input-min label-input ${mode}`} htmlFor="min_range">Minimum: </label>
                            <input
                                className={`input-min num-input ${mode}`}
                                type="number"
                                name="min_range"
                                value={isNaN(minVal) ? "" : minVal}
                                onChange={e => onInputMinValue(e.target.value, editSelect)}
                            />


                            <label className={`label-input-max label-input ${mode}`} htmlFor="min_range">Maximum: </label>
                            <input
                                className={`input-max num-input ${mode}`}
                                type="number"
                                name="max_range"
                                value={isNaN(maxVal) ? "": maxVal}
                                onChange={e => onInputMaxValue(e.target.value, editSelect)}
                            />
                        </form>
                    </div>
                    {problems.length === 0 ? "" : 
                    <div className="edit-problems">
                        <h3>Reminder:</h3>
                        <ul className="problem-list">
                            {problems.map((item, index) => {
                                return (
                                    <li key={`problem-${index}`}>{item}</li>
                                )
                            })}
                        </ul>
                    </div>}
                </div>
            </div>

            <div className="game-start-container">
                {selected.length === 0 ? "" :
                    <button className={`game-start-btn ${mode}`} onClick={start}>START</button>
                }
            </div>

        </div>
    )
}