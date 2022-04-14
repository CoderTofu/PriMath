import React from "react";
import "../css/component-css/view-mode.css"

export default function ViewMode(props) {
    let viewMode = props.viewMode;
    let changeMode = props.changeMode;

    function changeViewMode() {
        let localView = window.localStorage.getItem("view_mode")
        let setViewTo = ""
        if (localView === "light") {
            setViewTo = "dark"
        } else if (localView === "dark") {
            setViewTo = "light"
        } else {
            setViewTo = "light" // In case of unexpected results just set site to light mode
        }
        window.localStorage.setItem("view_mode", setViewTo)
        changeMode(setViewTo)
    }

    return (
        <div className={`mode-container ${viewMode}`}>
            <img onClick={changeViewMode} src={`/img/${viewMode}_mode_view.png`} alt="" />
        </div>
    )
}