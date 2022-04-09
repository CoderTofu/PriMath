import React from "react"
import { useEffect, useState } from 'react';

import "../css/page-css/challenges.css"

export default function Challenges(props) {
    let mode = props.viewMode

    // Available challenges buttons
    let available = ["Addition", "Subtraction", "Multiplication", "Division"];
    let [availableButtons, changeAvailableButtons] = useState([])

    // Selected challenges buttons
    let [selected, changeSelected] = useState([])
    let [selectedButtons, changeSelectButtons] = useState([])

    // For edit form
    let [editSelect, changeEditSelect] = useState("")
    let [showEdit, changeShowEdit] = useState("hide")


    function addChallenge(index, id) {
        let element = document.getElementById(id);
        removeAvailable(index)
        changeSelected(arr => [...arr, {
            name: element.value,
            min_range: 0,
            max_range: 10
        }])
        
    }
    // To future me: find a way to remove the indexed button on available buttons once clicked
    function removeAvailable(index) {
        console.log(availableButtons)
    }

    function challengeRange() {

    }

    function removeChallenge(type, id) {
        let element = document.getElementById(id)
        element.remove()

        let index = availableButtons.length()
        let createID = `available${index}`
        let createdButton = (
            <button
                className="available-btn"
                id={createID}
                onClick={() => { addChallenge(createID) }}
                key={createID}
                value={type}>
                {type.name}
            </button>
        )
    }

    function editChallenge(type) {
        changeShowEdit("show")
        changeEditSelect(type.name)
    }

    // This useEffect is made to initialize the buttons utilized to select the challenges that a user can pick.
    useEffect(() => {
        available.map((type, index) => {
            try {
                let createID = `available${index}`

                let createdButton = (
                    <button
                    className="available-btn" 
                    id={createID}
                    onClick={() => {addChallenge(index, createID)}} 
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
                    <h2>{editSelect}</h2>
                    <label htmlFor="min_range">Minimum: </label>
                    <input type="number" name="min_range" placeholder="1" />
                    <br />
                    <label htmlFor="min_range">Maximum: </label>
                    <input type="number" name="min_range" placeholder="10" />
                </form>
            </div>

        </div>
    )
}