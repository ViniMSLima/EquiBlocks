import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Challenge from "./Pages/Challenge";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </>
  );
}

export default App;
