// React or library imports
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';


// Page imports
import Home from './pages/home';
import Challenges from './pages/challenges';
import About from './pages/about';
import NotFound from "./pages/not_found";
import Game from "./pages/game"


// Component imports
import Menu from "./components/menu";


function App() {
  let localView = window.localStorage.getItem("view_mode");
  let [menuDisplay, setMenuDisplay] = useState("show")
  if (localView === null) {
    localView = "light"
    window.localStorage.setItem("view_mode", "light")
  }

  // Block of code to check what view mode we would want to use in a website

  let [mode, changeMode] = useState(localView) // The view mode changes with the help of the view-mode component 

  return (
    <div className={`App ${mode}`}>
      <Menu changeMode={changeMode} viewMode={mode} menu_display={menuDisplay} set_menu_display={setMenuDisplay} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home viewMode={mode}/>} />
          <Route path="/challenges" element={<Challenges viewMode={mode} />} />
          <Route path="/challenges/game" element={<Game viewMode={mode} set_menu_display={setMenuDisplay}/>} />
          <Route path="/about" element={<About viewMode={mode}/>} />
          <Route path="*" element={<NotFound viewMode={mode} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
