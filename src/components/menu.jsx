import { useState } from "react"
import "../css/menu.css"

export default function Menu() {
    let [menu, changeMenu] = useState(false)

    const showMenu = () => {
        changeMenu(!menu)
    }

    return (
        <div>
            {menu ? 
                <>
                    <button onClick={showMenu}>Close Menu</button>
                    <div className="menu">
                        THIS IS THE MENU
                    </div>
                </>
                :
                <button onClick={showMenu}>Open Menu</button>
            }
        </div>
    )
}