import React from "react"

export default function Game(props) {
    let stringedChallenges = window.localStorage.getItem("challenges");
    let parsedChallenges = JSON.parse(stringedChallenges);
    return (
        <div>
            {parsedChallenges.map((item, index) => {
                return (
                    <div key={index}>
                        <h2>Type: {item.name}</h2>
                        <h3>Min Range: {item.min_range}</h3>
                        <h3>Max Range: {item.max_range}</h3>
                    </div>
                )
            })}
        </div>
    )
}