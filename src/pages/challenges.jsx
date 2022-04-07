import { useEffect, useState } from 'react';

export default function Challenges(props) {
    // let mode = props.viewMode

    // Available challenges buttons
    let [available, changeAvailable] = useState(["Addition", "Subtraction", "Multiplication", "Division"])
    let [availableButtons, changeAvailableButtons] = useState([])

    // Selected challenges buttons
    let [selected, changeSelect] = useState([])
    let [selectedButtons, changeSelectButtons] = useState([])


    function addChallenge() {
        
    }

    function removeChallenge() {

    }

    function challengeRange() {

    }

    useEffect(() => {
        changeAvailableButtons([])
        available.map((type, index) => {
            try {
                let createID = `available${index}`

                let createdButton = (
                    <button 
                    id={createID} 
                    key={createID}>
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
                    {/* {selected} */}
                </div>
            </div>
        </div>
    )
}