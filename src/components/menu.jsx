import { Link } from "react-router-dom"
import "../css/component-css/menu.css"

export default function Menu() {
    function openMenu() {
        document.getElementById("menu-list").style.width = "300px";
    }

    function closeMenu() {
        document.getElementById("menu-list").style.width = "0px"
    }

    return (
        <div className="menu">
            <div onClick={openMenu} className="burger-menu"><img className="burger-icon" src="/img/burger.png" alt="" /></div>
            <ul id="menu-list" className={`menu-list`}>
                <div onClick={closeMenu} className="close-btn"><h3 className="close-sign">X</h3></div>
                <h2><Link className="menu-link" to={"/"}>PriMath</Link></h2>
                <li><Link className="menu-link" to={"/"}>Home</Link></li>
                <li><Link className="menu-link" to={"/challenges"}>Challenges</Link></li>
                <li><Link className="menu-link" to={"/about"}>About</Link></li>
                <li><Link className="menu-link" to={"/support"}>Support us</Link></li>
            </ul>
        </div>
    )
}