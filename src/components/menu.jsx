import React from "react";
import { Link } from "react-router-dom"
import "../css/component-css/menu.css"

export default function Menu(props) {
    let mode = props.viewMode;

    function openMenu() {
        document.getElementById("menu-list").style.left = "0px";
        document.getElementById("burger-menu").style.opacity = "0";
    }

    function closeMenu() {
        document.getElementById("menu-list").style.left = "-300px";
        document.getElementById("burger-menu").style.opacity = "1";
    }

    return (
        <div className="menu">
            <div onClick={openMenu} id="burger-menu" className={`burger-menu ${mode}`}><img className="burger-icon" src="/img/burger.png" alt="" /></div>
            <ul id="menu-list" className={`menu-list`}>
                <div onClick={closeMenu} className={`close-btn ${mode}`}><h3 className="close-sign">X</h3></div>
                <h2><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/"}>PriMath</Link></h2>
                <li><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/"}>Home</Link></li>
                <li><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/challenges"}>Challenges</Link></li>
                <li><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/about"}>About</Link></li>
                <li><Link onClick={closeMenu} className={`menu-link ${mode}`} to={"/support"}>Support us</Link></li>
            </ul>
        </div>
    )
}