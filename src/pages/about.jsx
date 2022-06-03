import React, {useEffect} from "react"

export default function About() {

    useEffect(() => {
        document.title = "PriMath | About us"
    }, [])

    return (
        <div>This is about</div>
    )
}