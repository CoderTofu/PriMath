import React, {useEffect} from "react"

export default function About() {

    useEffect(() => {
        document.title = "About us"
    }, [])

    return (
        <div>This is about</div>
    )
}