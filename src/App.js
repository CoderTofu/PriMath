// React or library imports
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';


// Page imports
import Home from './pages/home';
import Challenges from './pages/challenges';
import About from './pages/about';
import SupportUs from "./pages/support_us";
import ViewMode from "./components/view-mode";


// Component imports
import Menu from "./components/menu";


function App() {
  let localView = window.localStorage.getItem("view_mode")

  // Block of code to check what view mode we would want to use in a website
  let setViewTo = ""
  if (localView === "light") {
    setViewTo = "dark"
  } else if (localView === "dark") {
    setViewTo = "light"
  } else {
    setViewTo = "light" // In case of unexpected results just set site to light mode
  }

  let [mode, changeMode] = useState(setViewTo)

  return (
    <div className={`App ${mode}`}>
      <Menu viewMode={mode}/>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home viewMode={mode}/>} />
          <Route path="/challenges" element={<Challenges viewMode={mode}/>} />
          <Route path="/about" element={<About viewMode={mode}/>} />
          <Route path="/support" element={<SupportUs viewMode={mode}/>} />
        </Routes>
      </main>
      <ViewMode changeMode={changeMode} viewMode={mode}/>
    </div>
  );
}

export default App;
