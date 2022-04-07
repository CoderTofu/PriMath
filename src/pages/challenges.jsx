import { useState } from 'react';

export default function Challenges(props) {
    // let mode = props.viewMode
    // let [selected, changeSelect] = useState([])

    function addChallenge() {

    }

    function removeChallenge() {

    }

    function challengeRange() {

    }

    return (
        <div>
            <div>
                <div>Available Challenges:</div>
                <div>
                    <button>Addition</button>
                    <button>Subtraction</button>
                    <button>Multiplication</button>
                    <button>Division</button>
                </div>
            </div>
            <div>
                <div>Selected Challenges:</div>
                <div>
                    {/* Put the challenges selected here */}
                </div>
            </div>
        </div>
    )
}