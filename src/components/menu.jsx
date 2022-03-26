import { Link } from "react-router-dom"
import "../css/component-css/menu.css"

export default function Menu() {
    return (
        <div className="menu">
            <div className="burger-menu"><img className="burger-icon" src="/img/burger.png" alt="" /></div>
            <ul className={`menu-list`}>
                <h2><Link className="menu-link" to={"/"}>PriMath</Link></h2>
                <li><Link className="menu-link" to={"/"}>Home</Link></li>
                <li><Link className="menu-link" to={"/challenges"}>Challenges</Link></li>
                <li><Link className="menu-link" to={"/about"}>About</Link></li>
                <li><Link className="menu-link" to={"/support"}>Support us</Link></li>
            </ul>
        </div>
    )
}