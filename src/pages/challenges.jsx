import React from "react"
import { useEffect, useState } from 'react';
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

        // reset the problems
        updateProblems([])
    }

    function onInputMinValue(value, userSelected) {
        let type_val = "min value";
        try {
            let numberValue = parseInt(value) || "";
            setMinRange(numberValue);

            // CONDITION #1
            if (numberValue <= 0) {
                let msg = {
                    text: "Minimum value can't be zero.",
                    type: type_val
                }
                numberValue = 1;
                let updateCondition = true;
                for (let i in problems) {
                    if (problems[i].text === msg.text && problems[i].type === msg.type) {
                        updateCondition = false;
                    }
                }
                if (updateCondition) {
                    updateProblems([...problems, msg])
                }
                return
            } 

            // CONDITION #2
            if (numberValue > maxVal) {
                let msg = {
                    text: "Minimum value can't be higher than the maximum value.",
                    type: type_val
                }
                let updateCondition = true;
                for (let i in problems) {
                    if (problems[i].text === msg.text && problems[i].type === msg.type) {
                        updateCondition = false;
                    }
                }
                if (updateCondition) {
                    updateProblems([...problems, msg])
                }
                return
            }

            updateProblems(problems.filter(problem => {
                return problem.type !== type_val // removes objects that item if the object.type matches with type_val
            }));
            let index = selected.indexOf(userSelected);
            userSelected.min_val = numberValue;
            selected[index] = userSelected;
        } catch (e) {
            console.log("Something went wrong: " + e);
        }
    }

    function onInputMaxValue(value, userSelected) {
        let type_val = "max value";
        try {
            let numberValue = parseInt(value) || "";
            setMaxRange(numberValue);
            
            // CONDITION #1
            if (numberValue > 1000) {
                let msg = {
                    text: "Can't go higher than 1000.",
                    type: type_val
                }
                numberValue = 1000;
                setMaxRange(numberValue); // If user tries to type something higher than 1k sets the input back to just 1k
                let updateCondition = true;
                for (let i in problems) {
                    if (problems[i].text === msg.text && problems[i].type === msg.type) {
                        updateCondition = false;
                    }
                }
                if (updateCondition) {
                    updateProblems([...problems, msg])
                }
                return
            }

            // CONDITION #2
            if (numberValue <= minVal) {
                let msg = {
                    text: "Maximum value can't be equal or lower than minimum value.",
                    type: type_val
                }
                let updateCondition = true;
                for (let i in problems) {
                    if (problems[i].text === msg.text && problems[i].type === msg.type) {
                        updateCondition = false;
                    }
                }
                if (updateCondition) {
                    updateProblems([...problems, msg])
                }
                return
            }

            updateProblems(problems.filter(problem => {
                return problem.type !== type_val // removes objects that item if the object.type matches with type_val
            }));

            let index = selected.indexOf(userSelected);
            userSelected.max_val = numberValue;
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

    return (
        <div className={`challenge-container ${mode}`}>

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
                    <h2 className={`selected-type ${mode}`}>~~{editSelect.name}~~</h2>
                    <form>
                        <label className={`label-input-min label-input ${mode}`}htmlFor="min_range">Minimum: </label>
                        <input
                            className={`input-min num-input ${mode}`}
                            type="number"
                            name="min_range"
                            value={minVal}
                            onChange={e => onInputMinValue(e.target.value, editSelect)}
                        />


                        <label className={`label-input-max label-input ${mode}`} htmlFor="min_range">Maximum: </label>
                        <input
                            className={`input-max num-input ${mode}`}
                            type="number"
                            name="max_range"
                            value={maxVal}
                            onChange={e => onInputMaxValue(e.target.value, editSelect)}
                        />
                    </form>

                    <div className="edit-problems">
                        {problems.map((item, index) => {
                            return (
                                <p key={`problem-${index}`}>{item.text}</p>
                            )
                        })}
                    </div>
                </div>
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