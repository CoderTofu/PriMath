import React, {useEffect} from "react"
import { Link } from "react-router-dom"

import "../css/page-css/not_found.css"

export default function NotFound(props) {
    let mode = props.viewMode;

    useEffect(() => {
        document.title = "PriMath | 404"
    }, [])

    return (
        <div className={`not-found-container ${mode}`}>
            <h1 className="not-found-header">404</h1>
            <h2 className="not-found-secondary">Page not found.</h2>
            <p className="not-found-tertiary">Page may have been removed or have never existed in the first place.</p>
            <Link className={`go-home ${mode}`} to={"/"}>go home</Link>
        </div>
    )
}