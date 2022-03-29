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
  let [mode, changeMode] = useState()

  return (
    <div className="App">
      <Menu viewMode={mode}/>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home viewMode={mode}/>} />
          <Route path="/challenges" element={<Challenges viewMode={mode}/>} />
          <Route path="/about" element={<About viewMode={mode}/>} />
          <Route path="/support" element={<SupportUs viewMode={mode}/>} />
        </Routes>
      </main>
      <ViewMode changeMode={changeMode}/>
    </div>
  );
}

export default App;
