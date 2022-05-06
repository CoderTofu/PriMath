import React, {useEffect} from "react"

export default function NotFound() {
    useEffect(() => {
        document.title = "404"
    }, [])

    return (
        <div>
            PAGE NOT FOUND
        </div>
    )
}