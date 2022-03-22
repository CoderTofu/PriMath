import { useState } from "react"
import { Link } from "react-router-dom"
import "../css/menu.css"

export default function Menu() {
    return (
        <div className="menu">
            <div className="burger-menu"></div>
            <ul className={`menu-list`}>
                <li><Link className="menu-link" to={"/"}>Home</Link></li>
                <li><Link className="menu-link" to={"/challenges"}>Challenges</Link></li>
                <li><Link className="menu-link" to={"/about"}>About</Link></li>
                <li><Link className="menu-link" to={"/support"}>Support us</Link></li>
            </ul>
        </div>
    )
}