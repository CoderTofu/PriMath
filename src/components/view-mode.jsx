import { useState } from "react";
import "../css/view-mode.css"

export default function ViewMode() {
    let [view, changeView] = useState("dark_mode_view")
    let [viewClass, changeViewClass] = useState("dark")

    function canYouSee() {
        if (view === "dark_mode_view") {
            changeViewClass("light")
            changeView("light_mode_view")
        } else if (view === "light_mode_view") {
            changeView("dark_mode_view")
            changeViewClass("dark")
        }
    }

    return (
        <div className={`mode-container ${viewClass}`}>
            <img onClick={canYouSee} src={`/img/${view}.png`} alt="" />
        </div>
    )
}