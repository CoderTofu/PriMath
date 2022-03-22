// React or library imports
import { Routes, Route } from "react-router-dom";


// Page imports
import Home from './pages/home';
import Challenges from './pages/challenges';
import About from './pages/about';
import SupportUs from "./pages/support_us";


// Component imports
import Menu from "./components/menu";


function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<SupportUs />} />
      </Routes>
    </div>
  );
}

export default App;
