// React or library imports
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';


// Page imports
import Home from './pages/home';
import Challenges from './pages/challenges';
import About from './pages/about';
import SupportUs from "./pages/support_us";
import ViewMode from "./components/view-mode";
import NotFound from "./pages/not_found";
import Game from "./pages/game"


// Component imports
import Menu from "./components/menu";


function App() {
  let localView = window.localStorage.getItem("view_mode");
  if (localView === null) {
    localView = "light"
    window.localStorage.setItem("view_mode", "light")
  }

  // Block of code to check what view mode we would want to use in a website

  let [mode, changeMode] = useState(localView) // The view mode changes with the help of the view-mode component 

  return (
    <div className={`App ${mode}`}>
      <Menu viewMode={mode}/>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home viewMode={mode}/>} />
          <Route path="/challenges" element={<Challenges viewMode={mode} />} />
          <Route path="/challenges/game" element={<Game viewMode={mode} />} />
          <Route path="/about" element={<About viewMode={mode}/>} />
          <Route path="/support" element={<SupportUs viewMode={mode}/>} />
          <Route path="*" element={<NotFound viewMode={mode} />} />
        </Routes>
      </main>
      <ViewMode changeMode={changeMode} viewMode={mode}/>
    </div>
  );
}

export default App;
