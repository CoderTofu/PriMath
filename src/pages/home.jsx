import React, {useEffect} from "react"

import { Link } from "react-router-dom"
import "../css/page-css/home.css"

export default function Home(props) {
    let mode = props.viewMode

    useEffect(() => {
        document.title = "PriMath | Home"
    }, [])

    return (
        <div className="home-container">
            <div>
                <h1 className={`title ${mode}`}>PriMath</h1>
                <h3 className={`site-title ${mode}`}>For all the math lovers</h3>
            </div>
            <Link className={`generate-btn ${mode}`} to={"/challenges"}>continue</Link>
        </div>
    )
}