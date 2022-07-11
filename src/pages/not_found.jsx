import React, {useEffect} from "react"

export default function NotFound() {
    useEffect(() => {
        document.title = "PriMath | 404"
    }, [])

    return (
        <div>
            <h1>404</h1>
            <h2>Page not found.</h2>
            <p>Page may have been removed or have never existed in the first place.</p>
        </div>
    )
}