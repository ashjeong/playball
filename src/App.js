import './App.css';
import Solo from './solo/solo';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home/home';
import CPU from './CPU/CPU';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="solo" element={<Solo />} />
        <Route path="easy" element={<CPU mode={"easy"}/>} />
        <Route path="hard" element={<CPU mode={"hard"}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
