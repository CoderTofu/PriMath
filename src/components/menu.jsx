import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom"
import "../css/component-css/menu.css"

export default function Menu(props) {
    let mode = props.viewMode;
    let changeMode = props.changeMode;
    let [menuDisplay, setMenuDisplay] = useState("show")

    let [isChecked, setIsChecked] = useState(false);

    function openMenu() {
        document.getElementById("menu-list").style.right = "0px";
        document.getElementById("burger-menu").style.opacity = "0";
    }

    function closeMenu() {
        document.getElementById("menu-list").style.right = "-300px";
        document.getElementById("burger-menu").style.opacity = "1";
    }

    function changeViewMode() {
        setIsChecked(!isChecked)
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

    useEffect(() => {
        if (window.location.pathname.toString() === "/challenges/game") {
            setMenuDisplay("hide")
        } else {
            setMenuDisplay("show")
        }
    }, [window.location.pathname])

    return (
        <div className={`menu ${menuDisplay}`}>
            <div onClick={openMenu} id="burger-menu" className={`burger-menu ${mode}`}><img className="burger-icon" src="/img/burger.png" alt="" /></div>
            <ul id="menu-list" className={`menu-list`}>
                <div onClick={closeMenu} className={`close-btn ${mode}`}><h3 className="close-sign">X</h3></div>
                <h2><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/"}>PriMath</Link></h2>
                <li><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/"}>Home</Link></li>
                <li><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/challenges"}>Challenges</Link></li>
                <li><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/about"}>About</Link></li>
                <li><a onClick={closeMenu} className={`menu-link ${mode}`} target={"_blank"} href="https://github.com/CoderTofu/PriMath">Repository</a></li>
                <div id="set-mode">
                    <label 
                        htmlFor="view"
                        onClick={changeViewMode}
                        className="checkbox-container"
                    >
                        <input
                            type="checkbox"
                            name="view"
                            onChange={() => {
                                setIsChecked(!isChecked)
                            }}
                            checked={isChecked}
                        />
                        Dark Mode
                        <span className="checkmark"></span>
                    </label>
                </div>
            </ul>
        </div>
    )
}